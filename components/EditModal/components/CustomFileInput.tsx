import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  margin-top: 15px;
  background-color: white;
  padding: 5px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: box-shadow 0.5s;

  &:hover{
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 8px 0 rgba(0, 0, 0, 0.19);
  }
`;

export const CustomFileInput = props => {
  const hiddenFileInput = React.useRef(null);
  
  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    props.handlePictureChange(fileUploaded);
  };

  return (
    <>
      <Button onClick={handleClick}>
        Change picture
      </Button>
      <input
        type="file"
        accept="image/png, image/jpeg"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{display: 'none'}}
      />
    </>
  );
}