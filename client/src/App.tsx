
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AppHeader from './components/AppHeader';
import ModalComponent from './components/Modal';
import PurchaseForm from './components/PurchaseForm';
import logo from './logo.svg';
import "./styles/App.scss"

function App() {
  return (
    <div className="App">
      <AppHeader></AppHeader>
      <PurchaseForm></PurchaseForm>

    </div>
  );
}

export default App;
