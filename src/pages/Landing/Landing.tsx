import React, { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useNavigate } from "react-router-dom";

const style = {
  page: { margin: "10px", fontFamily: "Arial, sans-serif" },
  button: {
    backgroundColor: "#007BFF", color: "white", padding: "10px 20px", border: 0, borderRadius: "4px", cursor: "pointer",
  },
  span: { fontWeight: "bold", padding: "10px" },
  table: {
    display: "inline",
    margin: 0,
    padding: 0,
    borderCollapse: "collapse",
    verticalAlign: "middle",
    marginLeft: "40px",
  },
  th: { textAlign: "right" },
  td: { textAlign: "left", fontStyle: "bold" },
};

const Landing = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const navigate = useNavigate();
  const VITE_APP_OKTA_DOMAIN = import.meta.env.VITE_APP_OKTA_DOMAIN;
  const VITE_APP_OKTA_CLIENT_ID = import.meta.env.VITE_APP_OKTA_CLIENT_ID;

  const [clientId, setClientId] = useState(null);
  const [domain, setDomain] = useState(null);
  useEffect(() => {
    setClientId(VITE_APP_OKTA_CLIENT_ID);
    setDomain(VITE_APP_OKTA_DOMAIN);
  }, []);

  const handleAuthStateChange = async () => {
    if (authState?.isAuthenticated === undefined) {
      return;
    }
    if (authState?.isAuthenticated) {
      navigate("/hello");
      return;
    }
  };

  useEffect(() => {
    handleAuthStateChange();
  }, [authState?.isAuthenticated]);

  const login = async () => {
    await oktaAuth.signInWithRedirect();
  };
  return (<div style={style.page}>
    <button style={style.button} onClick={login}>
      Login
    </button>
    <table style={style.table}>
      <tbody>
      <tr>
        <th style={style.th}>Client :</th>
        <td style={style.td}>{clientId}</td>
      </tr>
      <tr>
        <th style={style.th}>Domain :</th>
        <td style={style.td}>{domain}</td>
      </tr>
      </tbody>
    </table>
    <hr />
    <h1>Hello, World</h1>
  </div>);
};
export default Landing;