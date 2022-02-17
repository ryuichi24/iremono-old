import React from 'react';

export const App = () => {
  return (
    <>
      <h1>App</h1>
      <p>{process.env.API_URL}</p>
    </>
  );
};
