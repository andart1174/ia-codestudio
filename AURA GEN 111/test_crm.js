const App = () => {
    const [leads, setLeads] = React.useState([
      { name: "Acme Corp", status: "Negotiation", value: "$45,000" },
      { name: "Global Tech", status: "Discovery", value: "$12,000" },
      { name: "Z-Systems", status: "Closed", value: "$89,000" }
    ]);
  
    return (
  <>

      <div style={{ background: "#f1f5f9", height: "100vh", display: "flex", fontFamily: "Inter" }}>
        <div style={{ padding: "40px" }}>
            testing
        </div>
      </div>
    
    <ExtraterrestreVivantEmbed />
  </>
);
};