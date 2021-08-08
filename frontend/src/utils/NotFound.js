import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div>
    <h1>404 - Not Found!</h1>
    <Link to="/EMapp">Go Home</Link>
  </div>
);

export default NotFound;
