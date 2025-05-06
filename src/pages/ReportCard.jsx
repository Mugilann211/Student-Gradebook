// import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import api from "../services/api";
// import ReactToPrint from "react-to-print";

// export default function ReportCard() {
//   const { studentId } = useParams();       // <-- picks up the :studentId
//   const [reportData, setReportData] = useState(null);
//   const reportRef = useRef();

//   useEffect(() => {
//     if (!studentId) return;
//     api
//       .get(`/students/${studentId}/report`)  // <-- match your backend path
//       .then(res => setReportData(res.data))
//       .catch(err => console.error("Error fetching report:", err));
//   }, [studentId]);

//   const downloadReport = async () => {
//     try {
//       const res = await api.get(
//         `/students/${studentId}/report/export`,
//         { responseType: "blob" }
//       );
//       const url = URL.createObjectURL(new Blob([res.data]));
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "report.pdf";
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//     } catch (err) {
//       console.error("Error downloading report:", err);
//     }
//   };

//   if (!reportData) return <div>Loading report…</div>;

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Student Report</h1>
//         <ReactToPrint
//           trigger={() => (
//             <button className="btn bg-green-600 text-white px-4 py-2 rounded">
//               Print PDF
//             </button>
//           )}
//           content={() => reportRef.current}
//         />
//         <button
//           onClick={downloadReport}
//           className="btn bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Download PDF
//         </button>
//       </div>

//       <div ref={reportRef}>
//         <h2 className="text-xl mb-2">{reportData.studentName}</h2>
//         <table className="w-full table-auto border">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-2 border">Subject</th>
//               <th className="p-2 border">Score</th>
//             </tr>
//           </thead>
//           <tbody>
//             {reportData.grades.map(g => (
//               <tr key={g.subjectId}>
//                 <td className="p-2 border">{g.subject}</td>
//                 <td className="p-2 border">{g.score}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }



// import React, { useState, useEffect, useRef } from "react";
// import api from "../services/api";
// import ReactToPrint from "react-to-print";

// export default function ReportCard() {
//   const [reportData, setReportData] = useState(null);
//   const reportRef = useRef();

//   // Fetch report data on mount
//   useEffect(() => {
//     api
//       .get("/report")
//       .then((res) => {
//         console.log("got full report:", res.data); // This should be an array
//         setReportData(res.data);
//       })
//       .catch((err) => {
//         console.error("Error fetching report:", err);
//       });
//   }, []);

//   // Download report PDF for a specific student
//   const downloadReport = async (studentId) => {
//     try {
//       const res = await api.get(`/report/${studentId}/export`, {
//         responseType: "blob", // Get the response as a blob (for PDF)
//       });

//       console.log("pdf", res.data); // Log the PDF data to check the response

//       const url = URL.createObjectURL(new Blob([res.data])); // Create a URL from the blob data
//       const a = document.createElement("a"); // Create an <a> element to download the file
//       a.href = url;
//       a.download = `${studentId}-report.pdf`; // Name the downloaded file based on studentId
//       document.body.appendChild(a); // Append the <a> to the document
//       a.click(); // Programmatically click the <a> to trigger the download
//       a.remove(); // Remove the <a> element after download
//     } catch (err) {
//       console.error("Error downloading report:", err);
//     }
//   };

//   if (!reportData) return <div>Loading report…</div>;

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4 gap-2">
//         <h1 className="text-2xl font-bold">All Students Report</h1>

//         <ReactToPrint
//           trigger={() => (
//             <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
//               Print All
//             </button>
//           )}
//           content={() => reportRef.current}
//         />
//       </div>

//       <div ref={reportRef}>
//         {reportData.map((stu, index) => (
//           <div key={index} className="mb-8 border rounded-xl shadow p-4 bg-white">
//             <h2 className="text-xl font-semibold mb-2">{stu.studentName}</h2>

//             <table className="w-full table-auto border">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="p-2 border">Subject</th>
//                   <th className="p-2 border">Score</th>
//                   <th className="p-2 border">Remarks</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {Array.isArray(stu.grades) &&
//                   stu.grades.map((g, idx) => (
//                     <tr key={idx}>
//                       <td className="p-2 border">{g.subject}</td>
//                       <td className="p-2 border">{g.score}</td>
//                       <td className="p-2 border">{g.remarks || "—"}</td>
//                     </tr>
//                   ))}
//               </tbody>
//             </table>

//             {/* Download button for each student */}
//             <button
//               onClick={() => downloadReport(stu.id)} // Pass student ID for download
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
//             >
//               Download Report
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




// import React, { useState, useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import api from "../services/api";
// import ReactToPrint from "react-to-print";

// export default function ReportCard() {
//   const { studentId } = useParams();       // <-- picks up the :studentId
//   const [reportData, setReportData] = useState(null);
//   const reportRef = useRef();

//   useEffect(() => {
//     if (!studentId) return;
//     api
//       .get(`/students/${studentId}/report`)  // <-- match your backend path
//       .then(res => setReportData(res.data))
//       .catch(err => console.error("Error fetching report:", err));
//   }, [studentId]);

//   const downloadReport = async () => {
//     try {
//       const res = await api.get(
//         `/students/${studentId}/report/export`,
//         { responseType: "blob" }
//       );
//       const url = URL.createObjectURL(new Blob([res.data]));
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "report.pdf";
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//     } catch (err) {
//       console.error("Error downloading report:", err);
//     }
//   };

//   if (!reportData) return <div>Loading report…</div>;

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Student Report</h1>
//         <ReactToPrint
//           trigger={() => (
//             <button className="btn bg-green-600 text-white px-4 py-2 rounded">
//               Print PDF
//             </button>
//           )}
//           content={() => reportRef.current}
//         />
//         <button
//           onClick={downloadReport}
//           className="btn bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Download PDF
//         </button>
//       </div>

//       <div ref={reportRef}>
//         <h2 className="text-xl mb-2">{reportData.studentName}</h2>
//         <table className="w-full table-auto border">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-2 border">Subject</th>
//               <th className="p-2 border">Score</th>
//             </tr>
//           </thead>
//           <tbody>
//             {reportData.grades.map(g => (
//               <tr key={g.subjectId}>
//                 <td className="p-2 border">{g.subject}</td>
//                 <td className="p-2 border">{g.score}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import api from "../services/api";
import { useReactToPrint } from 'react-to-print';

export default function ReportCard() {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const reportRef = useRef();

  // Print handler using the hook
  // const handlePrint = useReactToPrint({
  //   content: () => reportRef.current,
  //   pageStyle: `
  //     @page {
  //       size: A4;
  //       margin: 10mm;
  //     }
  //     @media print {
  //       body {
  //         padding: 20px;
  //       }
  //       button {
  //         display: none !important;
  //       }
  //     }
  //   `
  // });

  // Fetch report data on mount
  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const res = await api.get("/report");
        console.log("Report data:", res.data);
        
        // Map the data to ensure consistent ID property
        const formattedData = res.data.map(student => ({
          ...student,
          // Use student_id if it exists, otherwise fall back to id
          studentId: student.studentId || student.id
        }));
        
        setReportData(formattedData);
      } catch (err) {
        console.error("Error fetching report:", err);
        setError("Failed to load report data");
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  // Download report PDF for a specific student
  const downloadReport = async (studentId) => {
    if (!studentId) {
      console.error("Missing student_id");
      alert("Student ID is missing");
      return;
    }

    try {
      const res = await api.get(`/report/${studentId}/export`, {
        responseType: "blob",
      });

      // Create blob URL for the PDF
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `student-${studentId}-report.pdf`;
      document.body.appendChild(link);
      link.click();
      
      
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (err) {
      console.error("Error downloading report:", err);
      alert("Failed to download report. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        {error}
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Student Report Cards</h1>
        
        {/* <div className="flex gap-2">
          <button 
            onClick={handlePrint}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          >
            Print All
          </button>
        </div> */}
      </div>

      <div ref={reportRef} className="space-y-6">
        {reportData.map((student) => {
          console.log(student); 
          return (
            <div key={student.studentId || student.id} className="border rounded-lg shadow-sm bg-white overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {student.studentName || 'Unknown Student'}
                  </h2>
                  <span className="text-sm text-gray-500">
                    ID: {student.studentId || student.id}
                  </span>
                </div>
              </div>

              <div className="p-4">
  <table className="w-full border-collapse">
    <thead>
      <tr className="bg-gray-100">
        <th className="p-3 text-left border">Subject</th>
        <th className="p-3 text-left border">Score</th>
        <th className="p-3 text-left border">Grade</th>
        
      </tr>
    </thead>
    <tbody>
      {student.subjectGrades?.map((grade, index) => (
        <tr key={`${student.studentId}-${index}`} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
          <td className="p-3 border">{grade.subject || '-'}</td>
          <td className="p-3 border">{grade.score?.toFixed(1) || '-'}</td>
          <td className="p-3 border">{calculateGrade(grade.score)}</td>
          
        </tr>
      ))}
    </tbody>
  </table>
</div>

              <div className="p-4 border-t flex justify-end">
                <button
                  onClick={() => downloadReport(student.studentId || student.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Download PDF Report
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Helper function to calculate grade from score
function calculateGrade(score) {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

// import React, { useState, useEffect, useRef } from "react";
// import api from "../services/api";
// import { useReactToPrint } from 'react-to-print';

// export default function ReportCard() {
//   const [reportData, setReportData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const reportRef = useRef();

//   // Print handler using the hook
//   const handlePrint = useReactToPrint({
//     content: () => reportRef.current,
//     pageStyle: `
//       @page {
//         size: A4;
//         margin: 10mm;
//       }
//       @media print {
//         body {
//           padding: 20px;
//         }
//         button {
//           display: none !important;
//         }
//       }
//     `
//   });

//   // Fetch report data on mount
//   useEffect(() => {
//     const fetchReportData = async () => {
//       try {
//         const res = await api.get("/report");
//         console.log("Report data:", res.data);
//         setReportData(res.data);
//       } catch (err) {
//         console.error("Error fetching report:", err);
//         setError("Failed to load report data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReportData();
//   }, []);

//   // Download report PDF for a specific student
//   const downloadReport = async (student_id) => {
//     try {
//       const res = await api.get(`/report/${student_id}/export`, {
//         responseType: "blob",
//       });

//       // Create blob URL for the PDF
//       const blob = new Blob([res.data], { type: 'application/pdf' });
//       const url = URL.createObjectURL(blob);
      
//       // Create temporary link and trigger download
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = `student-${student_id}-report.pdf`;
//       document.body.appendChild(link);
//       link.click();
      
//       // Clean up
//       setTimeout(() => {
//         document.body.removeChild(link);
//         URL.revokeObjectURL(url);
//       }, 100);
//     } catch (err) {
//       console.error("Error downloading report:", err);
//       alert("Failed to download report. Please try again.");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 text-center text-red-500">
//         {error}
//         <button 
//           onClick={() => window.location.reload()}
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6 gap-4">
//         <h1 className="text-2xl font-bold text-gray-800">Student Report Cards</h1>
        
//         <div className="flex gap-2">
//           <button 
//             onClick={handlePrint}
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
//           >
//             Print All
//           </button>
//         </div>
//       </div>

//       <div ref={reportRef} className="space-y-6">
//   {reportData.map((student) => {
//     console.log(student); // Debugging student object
//     return (
//       <div key={student.id} className="border rounded-lg shadow-sm bg-white overflow-hidden">
//         <div className="p-4 border-b bg-gray-50">
//           <div className="flex justify-between items-center">
//             <h2 className="text-xl font-semibold text-gray-800">
//               {student.studentName || 'Unknown Student'}
//             </h2>
//             <span className="text-sm text-gray-500">
//               ID: {student.id}
//             </span>
//           </div>
//         </div>

//         <div className="p-4">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="p-3 text-left border">Subject</th>
//                 <th className="p-3 text-left border">Score</th>
//                 <th className="p-3 text-left border">Grade</th>
//                 <th className="p-3 text-left border">Remarks</th>
//               </tr>
//             </thead>
//             <tbody>
//               {student.grades?.map((grade, index) => (
//                 <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                   <td className="p-3 border">{grade.subject || '-'}</td>
//                   <td className="p-3 border">{grade.score || '-'}</td>
//                   <td className="p-3 border">{calculateGrade(grade.score)}</td>
//                   <td className="p-3 border">{grade.remarks || '-'}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="p-4 border-t flex justify-end">
//           <button
//             onClick={() => downloadReport(student.id)}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
//           >
//             Download PDF Report
//           </button>
//         </div>
//       </div>
//     );
//   })}
// </div>
//     </div>
//   );
// }

// // Helper function to calculate grade from score
// function calculateGrade(score) {
//   if (score >= 90) return 'A';
//   if (score >= 80) return 'B';
//   if (score >= 70) return 'C';
//   if (score >= 60) return 'D';
//   return 'F';
// }