import React from 'react';
import marked from 'marked';
import style from './Previewer.css';

marked.setOptions({
  sanitize: true
});

const Previewer = (props) => {
  return (
    <div 
      id="previewer"
      className={`${props.className} ${style.previewer}`}
    >
      <span 
        dangerouslySetInnerHTML={{ __html: marked(props.value) }}
      />
    </div>
  );
};

export default Previewer;