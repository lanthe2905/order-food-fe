import React, { useState } from 'react';
import { PageContext } from './context';
import List from './List';

export default () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  return (
    <React.Fragment>
      <PageContext.Provider
        value={{
          openDrawer,
          setOpenDrawer,
          selectedEmployee,
          setSelectedEmployee,
        }}
      >
        <List />
      </PageContext.Provider>
    </React.Fragment>
  );
};
