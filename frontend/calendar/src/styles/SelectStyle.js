const selectStyle = {
    control: (provided, state) => ({
      ...provided,
      border: '1px',
      borderColor: 'rgba(239, 241, 249, 0)',
      backgroundColor: 'rgba(239, 241, 249, 0)',
      color: 'rgba(239, 241, 249, 1)',
      minHeight: '153px',
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      width: '0px',
    }),
    singleValue: (provided, state) => {
      const transition = 'opacity 300ms';
      const color = "#3B3C43";
  
      return { ...provided, transition, color, fontSize: '14px' };
    },
    input: (provided, state) => {
      return { ...provided, fontSize: '14px' };
    },
    placeholder: (provided) => {
      return { ...provided, color: '#ABAFB1', fontSize: '14px' }
    },
    valueContainer: (provided) => {
      return { ...provided, paddingLeft: 14, paddingRight: 4 }
    },
    multiValue: (provided, state) => ({
      ...provided,
      borderRadius: '4px', // 예: border radius 추가
      backgroundColor: 'white',
      border: 'solid 1px black',
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: 'black',
      // ':hover': {
      //   backgroundColor: data.color,
      //   color: 'white',
      // },
    }),
  }