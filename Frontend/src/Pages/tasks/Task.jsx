import React from 'react'
import './Task.css'; // Import the CSS file for Task component
const Task = () => {
  return (
    <div>Task
    
    
    {  // selectedButton === 'generate' && (
        //   <div className="date-range">
        //     <label htmlFor="start-date">Start Date:</label>
        //     <input id="start-date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

        //     <label htmlFor="end-date">End Date:</label>
        //     <input id="end-date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

        //     <button onClick={generateReport}>
        //       <FaDownload className="download-icon" />
        //       Download
        //     </button>
        //   </div>
        // )}
        // {selectedButton === 'send' && (
        //   <>
        //     <h1>Mailing list details</h1>
        //     <table>
        //       <thead>
        //         <tr>
        //           <th>Customer_email</th>
        //           <th>Customer_name</th>
        //           <th>Template_name</th>
        //           <th>Status</th>
        //           <th>
        //             Select All
        //             <input type="checkbox" checked={selectAll} onChange={handleSelectAllChange} />
        //           </th>
        //         </tr>
        //       </thead>
        //       <tbody>
        //         {customers.map((user) => (
        //           <tr key={user.customer_email}>
        //             <td className="tableroww">{user.customer_email}</td>
        //             <td className="tableroww">{user.customer_name}</td>
        //             <td className="tableroww">{user.template_name}</td>
        //             <td className="tableroww">{user.status}</td>
        //             <td className="tableroww">
        //               <input
        //                 type="checkbox"
        //                 checked={selectedCustomers.includes(user.customer_email)}
        //                 onChange={(event) => handleCustomerCheckboxChange(event, user.customer_email)}
        //               />
        //             </td>
        //           </tr>
        //         ))}
        //       </tbody>
        //     </table>
        //     {selectedCustomers.length > 0 && (
        //       <button className='button' onClick={handleSendNow}>
        //         Send Now
        //       </button>
        //     )}

        // const generateReport = async () => {
        //   try {
        //     const response = await axios.get(`${baseUrl}generateReport`, {
        //       params: {
        //         startDate,
        //         endDate
        //       }
        //     }); // Replace with your API endpoint to generate the report
        //     const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
        //     const link = document.createElement('a');
        //     link.href = downloadUrl;
        //     link.setAttribute('download', 'customer_report.csv'); // Set the desired file name and extension
        //     document.body.appendChild(link);
        //     link.click();
        //   } catch (error) {
        //     console.error('Error generating report:', error);
        //   }
        // };


        //   </>
        // )}
      
      //   
  //      const generateReport = async () => {
  //   try {
  //     const response = await axios.get(`${baseUrl}generateReport`, {
  //       params: {
  //         startDate,
  //         endDate
  //       }
  //     }); // Replace with your API endpoint to generate the report
  //     const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement('a');
  //     link.href = downloadUrl;
  //     link.setAttribute('download', 'customer_report.csv'); // Set the desired file name and extension
  //     document.body.appendChild(link);
  //     link.click();
  //   } catch (error) {
  //     console.error('Error generating report:', error);
  //   }
  // };

    }
    
    
    
    
    
    
    
    
    
    </div>
  )
}

export default Task