import React, { useState } from 'react';
import List from './List';

export default () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  return (
    <React.Fragment>
      <List />
    </React.Fragment>
  );
};
