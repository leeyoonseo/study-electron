import React from 'react';
import marked from 'marked';
import style from './Previewer.css';
import emojione from 'emojione';

marked.setOptions({
  sanitize: true
});

const renderer = new marked.Renderer();
renderer.text = text => {
  return emojione.shortnameToImage(text);
};

const Previewer = (props) => {
  return (
    <div 
      id="previewer"
      className={`${props.className} ${style.previewer}`}
    >
      <span 
        dangerouslySetInnerHTML={{ __html: marked(props.value, { renderer }) }}
      />
    </div>
  );
};

export default Previewer;