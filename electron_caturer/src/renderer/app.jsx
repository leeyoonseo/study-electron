import React from 'react';
import { render } from 'react-dom';
import '../css/app.css';
import Trimmer from './components/Trimmer/Trimmer';

const app = document.getElementById('app');
render(<Trimmer />, app);