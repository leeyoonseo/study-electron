import React from 'react';
import { render } from 'react-dom';
import MarkdownEditorUI from './components/MarkdownEditorUI/MarkdownEditorUI';

const app = document.getElementById('app');
render(<MarkdownEditorUI />, app);