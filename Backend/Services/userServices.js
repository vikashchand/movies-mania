const dbCon = require('../config/dbConfig');
const mongoose = require('mongoose');


const randomstring = require('randomstring');

const sendDMail = require('../helpers/sendDMail');

const bcrypt=require('bcryptjs')
const jwt =require('jsonwebtoken')
const SECURITYKEY=process.env.SECURITYKEY
const User = require('../models/User');
const PasswordReset = require('../models/passwordReset');

const fs = require('fs');
const currentTime = new Date().toISOString("en-US", { timeZone: "Asia/Kolkata" });

const env=require('dotenv').config()
const SMTP_MAIL= process.env.SMTP_MAIL
const SMTP_PASSWORD =process.env.SMTP_PASSWORD

const nodemailer = require('nodemailer');
const { get } = require('http');
let loggedInUserEmail;


const List = require('../models/List');

const sendWelcomeEmail = async (email) => {
  try {
 // const htmlTemplate = fs.readFileSync('otp.html', 'utf8');
  // Create a nodemailer transporter using your email service configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: SMTP_MAIL,
      pass: SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  // Prepare the email content
 
  const mailOptions = {
    from: SMTP_MAIL,
    to: email,
    subject: 'You logged in successfully',
    html: `<p>Hi,</p><p>You have successfully logged in to your account.</p><p>Date and Time: ${currentTime}</p>`
  };
   // Send the email
   await transporter.sendMail(mailOptions);
   console.log('login Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

  


  



  const userLogin = async (req, res) => {
    const { identifier, password } = req.body;
  
    try {
      // Find the user by email or username
      const user = await User.findOne({
        $or: [{ email: identifier }, { username: identifier }],
      });
  
      if (!user) {
        return res.json({
          status: 400,
          message: 'User does not exist',
        });
      }
  
      const accountStatus = user.account_status;
  
      if (accountStatus === 'active') {
        const hashedPassword = user.password;
  
    
        const isAdmin = user.is_admin;
        const query = { is_admin: { $eq: isAdmin } };
       
  
        const isMatch = await bcrypt.compare(password.trim(), hashedPassword);
  
        if (isMatch) {
          // Fetch additional user data if needed
          const data2 = user.toJSON(); // Convert user object to JSON or extract required fields
  
          const auth = jwt.sign({ data: data2 }, SECURITYKEY);
  
          user.last_login = new Date();
          await user.save();
          await sendWelcomeEmail(data2.email);
          loggedInUserEmail = data2.email;
  
  
          res.json({
            status: 200,
            message: 'Login success',
            token: auth,
            email: data2.email,
          });
          
       
       
  
         
        
        } else {
          res.json({
            status: 400,
            message: 'Password does not match',
          });
        }
      } else {
        res.json({
          status: 400,
          message: 'Account is inactive. Please contact the admin department.',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      res.json({
        message: error.message,
      });
    }
  };
  



  const userSignup = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // Check if the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.json({
          status: 400,
          message: 'User with this email already exists',
        });
      }
  
      // Check if the username already exists
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.json({
          status: 400,
          message: 'User with this username already exists',
        });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
  
      // Save the user to the database
      await newUser.save();
  
      // Send verification mail
      const mailSubject = 'Mail verification';
      const randomToken = randomstring.generate();
      const content = `<p>Hi ${req.body.username},</p><p>Please click on the link to verify your email:</p><a href="https://manasmoviebackend.vercel.app/mail-verification?token=${randomToken}">Click here</a>`;
      await sendDMail(req.body.email, mailSubject, content);
  
      // Update user token in the database
      await User.updateOne({ email: req.body.email }, { token: randomToken });

     

    res.json({
      status: 200,
      message: 'A verification mail has been sent to your email id',
    });
  } catch (error) {
    console.error('Error:', error);
    res.json({
      message: error.message,
    });
  }
  }

  
  

       const  getLoggedInUserEmail = () => {
        return loggedInUserEmail;
      };


      
      
      const verifyMail = async (req, res) => {
        const token = req.query.token;
      
        try {
          const user = await User.findOne({ token });
      
          if (user) {
            user.token = null;
            user.is_verified = 1;
            await user.save();
      
            const htmlResponse = `
              <html>
                <head>
                  <title>Email Verification</title>
                </head>
                <body>
                  <p>Your email has been verified</p>
                  <a href="https://moviemanas.vercel.app/login">Go to Login</a>
                </body>
              </html>
            `;
      
            return res.send(htmlResponse);
          } else {
            const notFoundResponse = `
              <html>
                <head>
                  <title>Not Found</title>
                </head>
                <body>
                  <h1>404 - Not Found</h1>
                </body>
              </html>
            `;
      
            return res.send(notFoundResponse);
          }
        } catch (error) {
          console.log(error.message);
          // Handle error and return appropriate response
        }
      };
      



   
     








const forgetPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });

    if (user) {
      const mailSubject = 'Forget Password';
      const randomToken = randomstring.generate();
      const content = `<p>Hi ${user.username}</p><p>Please click on the link to reset your password:</p><a href="https://manasmoviebackend.vercel.app/forget-Password?token=${randomToken}">Click here</a>`;
      await sendDMail(email, mailSubject, content);

      await PasswordReset.deleteOne({ email });
      await PasswordReset.create({ email, token: randomToken });

      return res.status(200).json({ status: 200, message: 'Reset email has been sent to your email address' });
    }

    return res.status(404).json({ status: 404, message: 'Email not found' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, message: 'Internal server error' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const token = req.query.token;
    if (token === undefined) {
      res.status(404).send('404 - Not Found');
      return;
    }

    const passwordReset = await PasswordReset.findOne({ token });

    if (passwordReset) {
      const user = await User.findOne({ email: passwordReset.email });

      if (user) {
        // Render the reset-password HTML directly
        const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Reset Password</title>
          <style>
            /* CSS styles go here */
            .container {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: #E5E0FF;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .modal {
            width: 100%;
            /* height: 60px; */
            background: rgba(51, 51, 51, 0.5);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: 0.4s;
          }
          .modal-container {
            display: flex;
            max-width: 60vw;
            width: 100%;
            border-radius: 10px;
            overflow: hidden;
            position: absolute;
        
            transition-duration: 0.3s;
            background: #fff;
          }
            
          .modal-title {
            margin: 0;
            font-weight: 400;
            color: #55311c;
          }
          .form-error {
            font-size: 10px;
            color: #120101;
          }
          .modal-desc {
            margin: 6px 0 30px 0;
          }
          .modal-left {
            padding: 60px 30px 20px;
            background: #fff;
            flex: 1.5;
            transition-duration: 0.5s;
            opacity: 1;
          }
        
          .modal-right {
            flex: 2;
            font-size: 0;
            transition: 0.3s;
            overflow: hidden;
          }
          .modal-right img {
            width: 100%;
            height: 100%;
            transform: scale(1);
            -o-object-fit: cover;
            object-fit: cover;
            transition-duration: 1.2s;
          }
        
          .modal.is-open .modal-left {
            transform: translateY(0);
            opacity: 1;
            transition-delay: 0.1s;
          }
          .modal-buttons {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .modal-buttons a {
            color: rgba(51, 51, 51, 0.6);
            font-size: 14px;
          }
        
          .sign-up {
            margin: 60px 0 0;
            font-size: 14px;
            text-align: center;
          }
          .sign-up a {
            color: #8c7569;
          }
        
          .input-button {
            padding: 1.2rem 3.2rem;
            outline: none;
            text-transform: uppercase;
            border: 0;
            color: #fff;
            border-radius: 4px;
            background: #905738;
            transition: 0.3s;
            cursor: pointer;
           
          }
          .input-button:hover {
            background: #55311c;
          }
        
          .input-label {
            font-size: 11px;
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: 0.7px;
            color: #8c7569;
            transition: 0.3s;
          }
        
          .input-block {
            display: flex;
            flex-direction: column;
            padding: 10px 10px 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            margin-bottom: 20px;
            transition: 0.3s;
          }
          .input-block input {
            outline: 0;
            border: 0;
            padding: 4px 0 0;
            font-size: 14px;
          }
        
          .input-block input::-moz-placeholder {
            color: #ccc;
            opacity: 1;
          }
          .input-block input:-ms-input-placeholder {
            color: #ccc;
            opacity: 1;
          }
          .input-block input::placeholder {
            color: #ccc;
            opacity: 1;
          }
          .input-block:focus-within {
            border-color: #8c7569;
          }
          .input-block:focus-within .input-label {
            color: rgba(140, 117, 105, 0.8);
          }
        
          
        
            /* Rest of the CSS styles go here */
        
          </style>
        </head>
        <body>
            <% if (typeof error_message !=='undefined') { %>
                <p style="color: red"><%= error_message %></p>
              <% } %>
              
              <div class="container">
                <div class="modal">
                  <div class="modal-container">
                    <div class="modal-left">
                    <h1 className="modal-title">Welcome !</h1>
                      <p className="modal-desc">
                        Reset Your Password
                      </p>
                      
                      <form  method="POST" action="/forget-Password">
                        
                        <input type="hidden" name="user_id" value="${user._id}">
                        <input type="hidden" name="email" value="${user.email}">
                        <div class="input-block">
                          <label for="password" class="input-label">Password</label>
                          <input type="password" name="password" id="password" placeholder="Password" required>
                        </div>
                        
                        <div class="input-block">
                          <label for="confirm_password" class="input-label">Confirm Password</label>
                          <input type="password" name="confirm_password" id="confirm_password" placeholder="Confirm Password" required>
                        </div>
                     
                        <div class="modal-buttons">
                          <input type="submit" value="Reset Password" class="input-button">
                        </div>
                      </form>
                    </div>
                    <div class="modal-right">
                      <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29tcHV0ZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" alt="">
                    </div>
                  </div>
                </div>
              </div>
              
        </body>
        </html>
        
        `;
        res.send(html);
        return;
      }
    }

    res.status(404).send('404 - Not Found');
  } catch (error) {
    console.log(error.message);
  }
};

const resetPasswordPost = async (req, res) => {
  try {
    const updatedTime = new Date().toISOString("en-US", { timeZone: "Asia/Kolkata" });
    if (req.body.password !== req.body.confirm_password) {
      // Render the error message directly
      const errorHTML = `
        <html>
          <head>
            <title>Password Error</title>
          </head>
          <body>
            <p>Password does not match</p>
            <a href="/forget-Password?token=${req.body.token}">Go back</a>
          </body>
        </html>
      `;
      res.send(errorHTML);
      return;
    }

    
    const user = await User.findById(req.body.user_id);
    if (user) {
      bcrypt.hash(req.body.confirm_password, 10, async (err, hash) => {
        if (err) {
          console.log(err);
          return;
        }

        await PasswordReset.deleteOne({ email: req.body.email });
        user.password = hash;
        user.updated_at = updatedTime;
        await user.save();

        // Render the success message directly
        const successHTML = `
          <html>
            <head>
              <title>Password Changed</title>
            </head>
            <body>
              <p>Your password has been changed successfully</p>
              <a href="https://moviemanas.vercel.app/login">Login</a>
            </body>
          </html>
        `;
        res.send(successHTML);
      });
    } else {
      res.status(404).send('404 - Not Found');
    }
  } catch (error) {
    console.log(error.message);
  }
};










const addMovieToList = async (req, res) => {
  const { listName } = req.params;
  const { imdbID, name, year, type } = req.body;

  console.log('Received request to add movie to list:', listName, imdbID, name, year, type);

  try {
    let list = await List.findOne({ listName: listName });
    if (!list) {
      console.log('List not found, creating new list...');
      // If the list does not exist, create a new one
      list = new List({ listName: listName });
    }

    // Push the movie to the movies array in the list
    list.movies.push({ imdbID, name, year, type });

    // Save the updated list
    await list.save();

    console.log('Movie added to list successfully:', list);
    res.json(list);
  } catch (error) {
    console.error('Error adding movie to list:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




      module.exports = { userLogin, forgetPassword,resetPasswordPost,resetPassword,
        
        
        userSignup, getLoggedInUserEmail ,verifyMail,
addMovieToList
      
      };