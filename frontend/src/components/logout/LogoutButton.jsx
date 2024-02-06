import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const domainAndPort = process.env.REACT_APP_DOMAIN_AND_PORT;
  const navigate = useNavigate();
  navigate(`${domainAndPort}/login`);
}

export default LogoutButton;
