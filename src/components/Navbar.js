import React from 'react';
import {Link} from "react-router-dom";

export default function NavBar() {
  return <nav>
    <Link to="/">Home</Link>
    <Link to="/unique">Unique</Link>
    <Link to="/global">Global</Link>
    <Link to="/api">API</Link>
    <Link to="/station/bale">Station</Link>
    <Link to="/releves">Releves </Link>
    <Link to="/releves-slice">Releves Slice</Link>
    <Link to="/teste">Test 404</Link>
  </nav>
}
