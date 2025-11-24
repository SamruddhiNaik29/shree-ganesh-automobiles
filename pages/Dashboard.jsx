import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();

  // ✅ Load invoices from localStorage
  useEffect(() => {
    const savedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
    setInvoices(savedInvoices);
  }, []);

  // ✅ Calculate totals
  const totalInvoices = invoices.length;
  const totalRevenue = invoices.reduce((acc, inv) => acc + inv.finalTotal, 0);

  // ✅ Prepare data for chart (last 5 invoices)
  const chartData = invoices.slice(-5).map((inv) => ({
    name: inv.invoiceNo,
    amount: inv.finalTotal,
  }));

  // ✅ Delete single invoice
  const handleDelete = (invoiceNo) => {
    if (
      window.confirm(`Are you sure you want to delete invoice ${invoiceNo}?`)
    ) {
      const updatedInvoices = invoices.filter(
        (inv) => inv.invoiceNo !== invoiceNo
      );
      setInvoices(updatedInvoices);
      localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
    }
  };

  // ✅ Edit existing invoice
  //const handleEdit = (invoice) => {
  // navigate("/generate", { state: { invoiceToEdit: invoice } });
  //};

  // ✅ Download Invoice PDF
  const handleDownloadPDF = (invoice) => {
    import("jspdf").then((jsPDF) => {
      const doc = new jsPDF.default();
      doc.text(`Invoice No: ${invoice.invoiceNo}`, 10, 10);
      doc.text(`Client: ${invoice.billTo.name}`, 10, 20);
      doc.text(`Date: ${invoice.invoiceDate}`, 10, 30);
      doc.text(`Amount: ₹${invoice.finalTotal.toFixed(2)}`, 10, 40);
      doc.save(`Invoice_${invoice.invoiceNo}.pdf`);
    });
  };

  // ✅ Send Email
  const handleSendEmail = (invoice) => {
    const subject = `Invoice ${invoice.invoiceNo}`;
    const body = `Dear ${invoice.billTo.name},

Please find below the invoice details:

Invoice No: ${invoice.invoiceNo}
Date: ${invoice.invoiceDate}
Total Amount: ₹${invoice.finalTotal.toFixed(2)}

Thank you!`;

    window.location.href = `mailto:${
      invoice.billTo.email || ""
    }?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">📊 Dashboard</h2>

      {/* Stats */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="cards shadow-sm p-3">
            <h5>Total Invoices</h5>
            <h3>{totalInvoices}</h3>
          </div>
        </div>
        <div className="col-md-6">
          <div className="cards shadow-sm p-3">
            <h5>Total Revenue</h5>
            <h3>₹{totalRevenue.toFixed(2)}</h3>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="cards shadow-sm p-3 mb-4">
        <h5>📈 Last 5 Invoices</h5>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#ff7f50" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Invoices */}
      <div className="cards shadow-sm p-3">
        <h5 className="text-orange fw-bold mb-3">🧾 Recent Invoices</h5>
        {invoices.length === 0 ? (
          <p className="text-muted">No invoices available</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead className="table-light">
                <tr>
                  <th>Invoice No</th>
                  <th>Client</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices
                  .slice(-5)
                  .reverse()
                  .map((inv, index) => (
                    <tr key={index}>
                      <td>{inv.invoiceNo}</td>
                      <td>{inv.billTo.name}</td>
                      <td>{inv.invoiceDate}</td>
                      <td className="text-orange fw-bold">
                        ₹{inv.finalTotal.toFixed(2)}
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm me-2"
                          onClick={() => handleDelete(inv.invoiceNo)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-info btn-sm me-2"
                          onClick={() => handleSendEmail(inv)}
                        >
                          Send Email
                        </button>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleDownloadPDF(inv)}
                        >
                          Download PDF
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const Dashboard = () => {
//   const [invoices, setInvoices] = useState([]);
//   const navigate = useNavigate();

//   // ✅ Load invoices from localStorage
//   useEffect(() => {
//     const savedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
//     setInvoices(savedInvoices);
//   }, []);

//   // ✅ Calculate totals
//   const totalInvoices = invoices.length;
//   const totalRevenue = invoices.reduce((acc, inv) => acc + inv.finalTotal, 0);

//   // ✅ Prepare data for chart (last 5 invoices)
//   const chartData = invoices.slice(-5).map((inv) => ({
//     name: inv.invoiceNo,
//     amount: inv.finalTotal,
//   }));
//   // ✅ Delete single invoice
//   const handleDelete = (invoiceNo) => {
//     if (
//       window.confirm(`Are you sure you want to delete invoice ${invoiceNo}?`)
//     ) {
//       const updatedInvoices = invoices.filter(
//         (inv) => inv.invoiceNo !== invoiceNo
//       );
//       setInvoices(updatedInvoices);
//       localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
//     }
//   };

//   // ✅ Download Invoice PDF
//   const handleDownloadPDF = (invoice) => {
//     import("jspdf").then((jsPDF) => {
//       const doc = new jsPDF.default();
//       doc.text(`Invoice No: ${invoice.invoiceNo}`, 10, 10);
//       doc.text(`Client: ${invoice.billTo.name}`, 10, 20);
//       doc.text(`Date: ${invoice.invoiceDate}`, 10, 30);
//       doc.text(`Amount: ₹${invoice.finalTotal.toFixed(2)}`, 10, 40);
//       doc.save(`Invoice_${invoice.invoiceNo}.pdf`);
//     });
//   };

//   // ✅ Send Email
//   const handleSendEmail = (invoice) => {
//     const subject = `Invoice ${invoice.invoiceNo}`;
//     const body = `Dear ${invoice.billTo.name},

// Please find below the invoice details:

// Invoice No: ${invoice.invoiceNo}
// Date: ${invoice.invoiceDate}
// Total Amount: ₹${invoice.finalTotal.toFixed(2)}

// Thank you!`;

//     window.location.href = `mailto:${
//       invoice.billTo.email || ""
//     }?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4 text-center">📊 Dashboard</h2>

//       {/* Stats */}
//       <div className="row mb-4">
//         <div className="col-md-6">
//           <div className="cards shadow-sm p-3">
//             <h5>Total Invoices</h5>
//             <h3>{totalInvoices}</h3>
//           </div>
//         </div>
//         <div className="col-md-6">
//           <div className="card shadow-sm p-3">
//             <h5>Total Revenue</h5>
//             <h3>₹{totalRevenue.toFixed(2)}</h3>
//           </div>
//         </div>
//       </div>

//       {/* Chart */}
//       <div className="cards shadow-sm p-3 mb-4">
//         <h5>📈 Last 5 Invoices</h5>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={chartData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="amount" fill="#ff7f50" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Recent Invoices */}
//       <div className="cards shadow-sm p-3">
//         <h5 className="text-orange fw-bold mb-3">🧾 Recent Invoices</h5>
//         {invoices.length === 0 ? (
//           <p className="text-muted">No invoices available</p>
//         ) : (
//           <div className="table-responsive">
//             <table className="table table-striped align-middle">
//               <thead className="table-light">
//                 <tr>
//                   <th>Invoice No</th>
//                   <th>Client</th>
//                   <th>Date</th>
//                   <th>Amount</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {invoices
//                   .slice(-5)
//                   .reverse()
//                   .map((inv, index) => (
//                     <tr key={index}>
//                       <td>{inv.invoiceNo}</td>
//                       <td>{inv.billTo.name}</td>
//                       <td>{inv.invoiceDate}</td>
//                       <td className="text-orange fw-bold">
//                         ₹{inv.finalTotal.toFixed(2)}
//                       </td>
//                       <td>
//                         <button
//                           className="btn btn-danger btn-sm me-2"
//                           onClick={() => handleDelete(inv.invoiceNo)}
//                         >
//                           Delete
//                         </button>
//                         <button
//                           className="btn btn-info btn-sm me-2"
//                           onClick={() => handleSendEmail(inv)}
//                         >
//                           Send Email
//                         </button>
//                         <button
//                           className="btn btn-primary btn-sm"
//                           onClick={() => handleDownloadPDF(inv)}
//                         >
//                           Download PDF
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// src/pages/Dashboard.jsx
// import React, { useEffect, useState, useRef } from "react";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";
// import {
//   LayoutDashboard,
//   Receipt,
//   LogOut,
//   FileText,
//   Users,
//   DollarSign,
//   Clock,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import html2pdf from "html2pdf.js";

// const Dashboard = () => {
//   const [invoices, setInvoices] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const savedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
//     setInvoices(savedInvoices);
//   }, []);
//   const invoiceData = location.state?.invoiceData;

//   const invoiceRef = useRef();
//   if (!invoiceData) {
//     return (
//       <div className="container mt-4">
//         <h4>No invoice data available!</h4>
//         <button className="btn btn-secondary" onClick={() => navigate(-1)}>
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   // Delete Invoice
//   const handleDelete = () => {
//     if (window.confirm("Are you sure you want to delete this invoice?")) {
//       let savedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
//       savedInvoices = savedInvoices.filter(
//         (inv) => inv.invoiceNo !== invoiceData.invoiceNo
//       );
//       localStorage.setItem("invoices", JSON.stringify(savedInvoices));
//       alert("Invoice deleted!");
//       navigate("/dashboard");
//     }
//   };

//   // Download Invoice as PDF
//   const handleDownloadPDF = () => {
//     if (!invoiceRef.current) return;

//     const invoiceName = invoiceData.invoiceNo
//       ? `Invoice_${invoiceData.invoiceNo}`
//       : invoiceData.billTo?.name
//       ? `Invoice_${invoiceData.billTo.name}`
//       : "Invoice";

//     const opt = {
//       margin: [0.3, 0.3, 0.3, 0.3],
//       filename: `${invoiceName}.pdf`,
//       image: { type: "jpeg", quality: 1 },
//       html2canvas: { scale: 4, useCORS: true },
//       jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
//     };

//     html2pdf().set(opt).from(invoiceRef.current).save();
//   };

//   // Send Email
//   const handleSendEmail = () => {
//     const subject = `Invoice ${invoiceData.invoiceNo}`;
//     const body = `Dear ${invoiceData.billTo?.name},

// Please find below the invoice details:

// Invoice No: ${invoiceData.invoiceNo}
// Date: ${invoiceData.invoiceDate}
// Total Amount: ₹${invoiceData.finalTotal.toFixed(2)}

// Thank you!
// `;

//     window.location.href = `mailto:${
//       invoiceData.billTo?.email || ""
//     }?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
//   };

//   // Stats
//   const totalInvoices = invoices.length;
//   const totalRevenue = invoices.reduce((sum, inv) => sum + inv.finalTotal, 0);
//   const uniqueClients = new Set(invoices.map((inv) => inv.billTo.name)).size;
//   const pendingInvoices = invoices.filter(
//     (inv) => inv.status === "Pending"
//   ).length;

//   // Chart Data
//   const revenueData = invoices.map((inv) => ({
//     name: inv.invoiceNo,
//     revenue: inv.finalTotal,
//   }));
//   const statusData = [
//     { name: "Paid", value: invoices.filter((i) => i.status === "Paid").length },
//     {
//       name: "Pending",
//       value: invoices.filter((i) => i.status === "Pending").length,
//     },
//   ];
//   const COLORS = ["#f97316", "#facc15"]; // orange + yellow

//   return (
//     <div className="d-flex min-vh-100 bg-light">
//       {/* Sidebar */}
//       <div className="bg-white shadow vh-100 p-3" style={{ width: "250px" }}>
//         <div className="mb-4 text-center text-orange fw-bold fs-4 d-flex align-items-center justify-content-center gap-2">
//           <LayoutDashboard /> Dashboard
//         </div>
//         <nav className="nav flex-column">
//           {/* <button
//             className="nav-link text-dark d-flex align-items-center gap-2"
//             onClick={() => navigate("/dashboard")}
//           >
//             <LayoutDashboard /> Dashboard
//           </button> */}
//           <button
//             className="nav-link text-dark d-flex align-items-center gap-2"
//             onClick={() => navigate("/invoice")}
//           >
//             <Receipt /> Invoices
//           </button>
//         </nav>
//         <div className="mt-auto text-center">
//           <button
//             className="btn btn-outline-danger d-flex align-items-center gap-2"
//             onClick={() => navigate("/")}
//           >
//             <LogOut /> Logout
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-grow-1 p-4">
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           {/* <h2 className="text-orange fw-bold">📊 Dashboard</h2> */}
//           <span className="badge bg-warning text-dark fs-6 shadow">
//             Welcome Back!
//           </span>
//         </div>

//         {/* Stats */}
//         <div className="row g-4 mb-4">
//           <div className="col-md-6 col-lg-3">
//             <div className="cards border-start border-4 border-orange shadow-sm h-100">
//               <div className="cards-body d-flex align-items-center gap-3">
//                 <FileText size={40} className="text-orange" />
//                 <div>
//                   <p className="text-muted mb-1">Total Invoices</p>
//                   <h4 className="fw-bold">{totalInvoices}</h4>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-6 col-lg-3">
//             <div className="cards border-start border-4 border-warning shadow-sm h-100">
//               <div className="cards-body d-flex align-items-center gap-3">
//                 <DollarSign size={40} className="text-warning" />
//                 <div>
//                   <p className="text-muted mb-1">Total Revenue</p>
//                   <h4 className="fw-bold">₹{totalRevenue.toFixed(2)}</h4>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-6 col-lg-3">
//             <div className="card border-start border-4 border-orange shadow-sm h-100">
//               <div className="card-body d-flex align-items-center gap-3">
//                 <Users size={40} className="text-orange" />
//                 <div>
//                   <p className="text-muted mb-1">Unique Clients</p>
//                   <h4 className="fw-bold">{uniqueClients}</h4>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-6 col-lg-3">
//             <div className="cards border-start border-4 border-warning shadow-sm h-100">
//               <div className="cards-body d-flex align-items-center gap-3">
//                 <Clock size={40} className="text-warning" />
//                 <div>
//                   <p className="text-muted mb-1">Pending Invoices</p>
//                   <h4 className="fw-bold">{pendingInvoices}</h4>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Charts */}
//         <div className="row g-4 mb-4">
//           <div className="col-lg-6">
//             <div className="cards shadow-sm h-100 p-3">
//               <h5 className="text-orange fw-bold mb-3">
//                 📈 Revenue by Invoice
//               </h5>
//               {revenueData.length === 0 ? (
//                 <p className="text-muted">No data available</p>
//               ) : (
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart data={revenueData}>
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Bar dataKey="revenue" fill="#f97316" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               )}
//             </div>
//           </div>

//           <div className="col-lg-6">
//             <div className="cards shadow-sm h-100 p-3">
//               <h5 className="text-orange fw-bold mb-3">🥧 Invoice Status</h5>
//               {totalInvoices === 0 ? (
//                 <p className="text-muted">No invoices available</p>
//               ) : (
//                 <ResponsiveContainer width="100%" height={300}>
//                   <PieChart>
//                     <Pie
//                       data={statusData}
//                       cx="50%"
//                       cy="50%"
//                       outerRadius={100}
//                       fill="#8884d8"
//                       dataKey="value"
//                       label={({ name, percent }) =>
//                         `${name} ${(percent * 100).toFixed(0)}%`
//                       }
//                     >
//                       {statusData.map((entry, index) => (
//                         <Cell
//                           key={`cell-${index}`}
//                           fill={COLORS[index % COLORS.length]}
//                         />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Recent Invoices */}
//         <div className="cards shadow-sm p-3">
//           <h5 className="text-orange fw-bold mb-3">🧾 Recent Invoices</h5>
//           {invoices.length === 0 ? (
//             <p className="text-muted">No invoices available</p>
//           ) : (
//             <div className="table-responsive">
//               <table className="table table-striped align-middle">
//                 <thead className="table-light">
//                   <tr>
//                     <th>Invoice No</th>
//                     <th>Client</th>
//                     <th>Date</th>
//                     <th>Amount</th>
//                     <th className="text-center">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {invoices
//                     .slice(-5)
//                     .reverse()
//                     .map((inv, index) => (
//                       <tr key={index}>
//                         <td>{inv.invoiceNo}</td>
//                         <td>{inv.billTo.name}</td>
//                         <td>{inv.invoiceDate}</td>
//                         <td className="text-orange fw-bold">
//                           ₹{inv.finalTotal.toFixed(2)}
//                         </td>
//                         <td className="text-center">
//                           {/* Action Buttons for each invoice */}
//                           <button
//                             className="btn btn-danger me-2"
//                             onClick={handleDelete}
//                           >
//                             Delete Invoice
//                           </button>

//                           <button
//                             className="btn btn-info me-2"
//                             onClick={handleSendEmail}
//                           >
//                             Send Email
//                           </button>

//                           <div className="text-center mt-3">
//                             <button
//                               className="btn btn-primary"
//                               onClick={handleDownloadPDF}
//                             >
//                               Download PDF
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
