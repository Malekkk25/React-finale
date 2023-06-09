import React from 'react'
import  { useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import{useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Autocomplete } from '@mui/material';
import FullLayout from "../components/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from '../theme/theme';
import Axios from 'axios';
import {
    Grid,
    Stack,
    TextField,
    Button,
  } from "@mui/material";
  import BaseCard from '../components/baseCard/BaseCard';
  
const UpdateProduct = () => {
  const { id } = useParams();
  const [Category, setCategories] = useState([]);
  const [Prods, setProds] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/getCategorie').then((response) => {
      setCategories(response.data);
      console.log(response.data);
    });

    axios.get(`http://localhost:3001/api/getProduct/${id}`)
      .then(response => {
        const { name, Qstock,state,prix,category,code ,image} = response.data;
        setName(name);
        setNewName(name);
        setQstock(Qstock);
        setState(state);
        setPrix(prix);
        setCategory(category);
        setCode(code);
        setNewCode(code);
        setImage(image)
        console.log(image)
        axios.get(`http://localhost:3001/api/categories/${category}`)
      .then(response => {
        const {name} = response.data;
        setNameCat(name);
        console.log(name)
      })
      .catch(error => console.log(error));

        
      })
      .catch(error => console.log(error));
  }, [id]);

  const options = Category.map((category) => ({
    id: category.id,
    name: category.name,
  }));


  useEffect(() => {
    Axios.get('http://localhost:3001/api/getProduct').then((response) => {
      setProds(response.data);
      console.log(response.data);

    });
  }, []);
  const opt = Prods.map((p) => ({
    id: p.id,
    code: p.code,
    name: p.name,
    
  }));


  const importAll = (r) => {
    let images = {};
    r.keys().forEach((key) => (images[key] = r(key)));
    return images;
  };

  const images = importAll(require.context('./../assets/products', false, /.(png|jpe?g|svg)$/));

  const [name ,setName]=useState('');
  const [newName ,setNewName]=useState('');
  const [Qstock , setQstock]=useState('');
  const [state , setState] =useState('available');
  const [prix ,setPrix] =useState('');
  const [value, setValue] = useState('');
  const [category ,setCategory] =useState('');
  const [code ,setCode] =useState('');
  const [newCode ,setNewCode] =useState('');
  const [nameCat ,setNameCat] =useState('');
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState('null');
    const navigate = useNavigate();
    const handleNameChange =(event) => {
      setNewName(event.target.value);
    };
  const handleQuantityChange =(event) => {
    setQstock(event.target.value);
    };
const handleStateChange =(event) => {
  setState(event.target.value);
};
const handlePriceChange =(event) => {
setPrix(event.target.value);
};
const handleCategoryChange =(event) => {
setCategory(event.target.value);
};

const handleCodeChange =(event) => {
setNewCode(event.target.value);
};


const handleClearForm = () => {
  navigate('/Product')
};


const validateForm = () => {
  let isValid = true;
  let errors = {};

  if (!code) {
    errors.code = "Product code is required";
    isValid = false;
  }
  if (!name) {
    errors.name = "Product name is required";
    isValid = false;
  }
  if(!(name==newName)){
  if (opt.find((p) => p.name.toLowerCase() === newName.toLowerCase())) {
    errors.name = "Product name already exists";
    console.log(errors.name);
    isValid = false;
  }}
  if(!(code==newCode)){
  if (opt.find((p) => p.code === newCode) ){
    errors.code = "Product code already exists";
    console.log(errors.code);
    isValid = false;
  }}
  if (!Qstock) {
    errors.Qstock = "Stock quantity is required";
    isValid = false;
  } else if (Qstock < 0) {
    errors.Qstock = "Stock quantity must be a positive number";
    isValid = false;
  }

  if (!prix) {
    errors.prix = "Product price is required";
    isValid = false;
  } else if (prix < 0) {
    errors.prix = "Product price must be a positive number";
    isValid = false;
  }

  if (!category) {
    errors.category = "Category is required";
    isValid = false;
  }

  if (!image) {
    errors.image = "Product image is required";
    isValid = false;
  }
  setErrors(errors);
  return isValid;
};
  //   const handleSubmit =(event) => {
  //       event.preventDefault();
  //       const data={
  //         name: name,
  //         Qstock:Qstock,
  //         state:state,
  //         prix:prix,
  //         category:category,
  //         code:code,
    
  //     };
  //       console.log(data);
  //       if (validateForm()) { 
        
  //     axios.put(`http://localhost:3001/api/updateProduct/${id}`, data)
  //         .then(response => {
  //           console.log(response);
  //           navigate('/Product');
  //         })
  //         .catch(error => console.log(error));
  //   }
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
      const formData = new FormData();
      formData.append('prix', prix);
      formData.append('Qstock', Qstock);
      formData.append('category', category);
      formData.append('name', newName);
      formData.append('code', newCode);
      formData.append('image', image);
      if(validateForm()){
      try {
      await axios.put(`http://localhost:3001/api/updateProduct/${id}`, formData);
      navigate('/Product');
    } catch (error) {
      console.error(error);
     
    }}
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <FullLayout>
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12} sx={{ textAlign: 'left' }}>
        <BaseCard title="Update Product">
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}  >
          <TextField
          id="code"
          label="Product Code "
          variant="outlined"
          error={!!errors.code}
          helperText={errors.code}
          value={newCode}
          onChange={handleCodeChange}
          onFocus={() => setErrors({ ...errors, code: '' })}
          sx={{ width: "60%" }}
        />
          <TextField
              id="name"
              label="Product Name "
              variant="outlined"
              error={!!errors.name}
          helperText={errors.name}
              value={newName}
              onChange={handleNameChange}
              sx={{ width: '60%' }} 
              onFocus={() => setErrors({ ...errors, name: '' })} 
            />
            <TextField
              id="quantity"
              label="Stock quantity "
              variant="outlined"
              error={!!errors.Qstock}
              helperText={errors.Qstock}
              value={Qstock}
              type='number'
              onFocus={() => setErrors({ ...errors, Qstock: '' })}
              onChange={handleQuantityChange}
              sx={{ width: '60%' }}  
            />
            
    <TextField
              id="price"
              label="Product Price "
              variant="outlined"
             
              value={prix}
              type='number'
              
              onChange={handlePriceChange}
              sx={{ width: '60%' }}  
              error={!!errors.prix}
              helperText={errors.prix}
              onFocus={() => setErrors({ ...errors, prix: '' })}
            />

              
           <Autocomplete
  options={options}
  getOptionLabel={(option) => option.name}
  renderInput={(params) => (
    <TextField
      {...params}
      label={nameCat}
      variant="outlined"
      error={!!errors.category}
      helperText={errors.category}
    />
  )}
  value={category.name}
  onChange={(event, newValue) => {
    setCategory(newValue ? newValue.id : "");
  }}
  sx={{ width: "60%" }}
  onFocus={() => setErrors({ ...errors, category: '' })}
/>

<label
  htmlFor="image-input"
  style={{
    display: 'inline-block',
    width: '200px',
    height: '200px',
    border: '2px dashed #aaa',
    borderRadius: '8px',
    backgroundColor: '#f5f5f5',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'border-color 0.3s ease',
    marginLeft:'850px',
    marginTop: '-280px',
  }}
>
<input
  type="file"
  id="image-input"
  accept="image/*"
  onChange={handleImageChange}
  style={{
    display: 'none',
  }}
  onFocus={() => setErrors({ ...errors, image: '' })}
/>
{errors.image && (
  <span style={{ color: 'red' }}>{errors.image}</span>
)}
  <span
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#aaa',
      transition: 'color 0.3s ease',
    }}
  >
    +
  </span>
</label>   
              

          </Stack>
          <br />
          <br/>
          <br/>
          <Button type='submit' variant="contained" mt={2}>
            Submit
          </Button>
          <Button variant="outlined" sx={{ ml: '10px' }} onClick={handleClearForm}>
  Return
</Button>
</form>
        </BaseCard>
      </Grid>
      </Grid>
      </FullLayout>
      </ThemeProvider>
  )
}

export default UpdateProduct