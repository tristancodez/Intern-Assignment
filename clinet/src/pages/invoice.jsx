
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import { format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import './booking.css';

const Invoice = () => {

    // Retrieve data passed via location state
    const location = useLocation();
    const invoice = location.state?.invoice;
    const tour = location.state?.tour;

    console.log("Invoice Data:", invoice);  // Debugging: Log the invoice data
    console.log("Tour Data:", tour)

    if (!invoice || !tour) {
      return <div>Loading...</div>; // or handle error
    }

    const pricePerTraveler = tour.price;
    const gstRate = 0.18;  // 18% GST rate

    // Calculate Total Amount (Price, GST, CGST, SGST)
    const calculateTotalAmount = () => {
        const startDate = new Date(invoice.start_date);
        const endDate = new Date(invoice.end_date);
        const timeDifference = endDate - startDate; // difference in milliseconds
        const numberOfDays = timeDifference / (1000 * 3600 * 24); // convert milliseconds to days
        
        const totalPrice = pricePerTraveler * invoice.travelers * numberOfDays;
        const gst = totalPrice * gstRate;
        const cgst = gst / 2;
        const sgst = cgst;
        const grandTotal = totalPrice+cgst+sgst;
    
        return { totalPrice, gst, cgst, sgst, numberOfDays, grandTotal };
    };

    // Function to generate and download PDF invoice
    const generatePDF = () => {
        const { totalPrice, gst, cgst, sgst, numberOfDays, grandTotal } = calculateTotalAmount();
         // This is where the grandTotal is calculated

        const doc = new jsPDF();
        doc.setFontSize(12);
        doc.text("Invoice", 20, 20);
        doc.text(`Invoice ID: ${Math.floor(Math.random() * 100000)}`, 20, 30);
        doc.text(`Date: ${format(new Date(), 'dd/MM/yyyy')}`, 20, 40);

        doc.text(`Tour Title: ${tour.title}`, 20, 50);
        doc.text(`Customer Name: ${invoice.name}`, 20, 60);
        doc.text(`Email: ${invoice.email}`, 20, 70);
        doc.text(`Contact: ${invoice.contact}`, 20, 80);
        doc.text(`Travelers: ${invoice.travelers}`, 20, 90);
        doc.text(`Start Date: ${format(new Date(invoice.start_date), 'dd/MM/yyyy')}`, 20, 100);
        doc.text(`End Date: ${format(new Date(invoice.end_date), 'dd/MM/yyyy')}`, 20, 110);

        doc.text(`Price per Traveler: $${pricePerTraveler}`, 20, 120);
        doc.text(`Number of Days: ${numberOfDays}`, 20, 130);
        doc.text(`Total Price: $${totalPrice.toFixed(2)}`, 20, 140);
        
        doc.text(`GST (18%): $${gst.toFixed(2)}`, 20, 150);
        doc.text(`CGST: $${cgst.toFixed(2)}`, 20, 160);
        doc.text(`SGST: $${sgst.toFixed(2)}`, 20, 170);
        
        doc.text(`Grand Total: $${grandTotal.toFixed(2)}`, 20, 180);

        doc.text("Thank you for your booking!", 20, 200);
        
        doc.save('invoice.pdf');
    };


    return(
        <div className='confirmation-message'>
            <h3>Your booking was successful!</h3>
            <p>Thank you for your booking. We will send you an invoice shortly.</p>
            <div className='invoice'>
                <h4>Invoice Details</h4>
                <p><strong>Invoice ID:</strong> {invoice?.invoiceId}</p>
                <p><strong>Name:</strong> {invoice?.name}</p>
                <p><strong>Age:</strong> {invoice?.age}</p>
                <p><strong>Location:</strong> {tour?.location}</p>
                <p><strong>Tour Title:</strong> {tour?.title}</p>
                <p><strong>Email:</strong> {invoice?.email}</p>
                <p><strong>Contact:</strong> {invoice?.contact}</p>
                <p><strong>Travelers:</strong> {invoice?.travelers}</p>
                <p><strong>Start Date:</strong> {invoice?.start_date}</p>
                <p><strong>End Date:</strong> {invoice?.end_date}</p>
                <p><strong>Special Request:</strong> {invoice?.special_req || 'None'}</p>

                {/* Tax and Pricing Details */}
                <p><strong>Price per Traveler:</strong> ${pricePerTraveler}</p>
                <p><strong>Number of Days:</strong> {invoice?.numberOfDays}</p>
                <p><strong>Total Price:</strong> ${invoice?.totalPrice?.toFixed(2)}</p>

                {/* GST, CGST, and SGST */}
                <p><strong>GST (18%):</strong> ${invoice?.gst?.toFixed(2)}</p>
                <p><strong>CGST:</strong> ${invoice?.cgst?.toFixed(2)}</p>
                <p><strong>SGST:</strong> ${invoice?.sgst?.toFixed(2)}</p>
                
                {/* Grand Total */}
                <p><strong>Grand Total:</strong> ${invoice?.grandTotal?.toFixed(2)}</p>

                {/* Button to Download PDF */}
                <button onClick={generatePDF}>Download Invoice as PDF</button>
            </div>
        </div>
    );
};

export default Invoice;
