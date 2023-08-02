import { Chip, Stack } from '@mui/material';
import { useState, useEffect } from 'react'
import { pink, yellow } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

const ColorChip = styled(Chip)(({ theme }) => ({
    color: theme.palette.getContrastText(yellow[300]),
    backgroundColor: yellow[200],
    '&:hover': {
      backgroundColor: pink[900],
    },
    
  }));

function Chips() {
    const [types, setTypes] = useState([]);

    const handleClick = (type)=>{
        console.log(type);
    };
    useEffect(() => {
        const fetchTypes = async () => {
        const api = await fetch('https://pokeapi.co/api/v2/type');
        const data = await api.json();
        const { results } = data;
        const typeNames = results.map((type) => type.name);
        setTypes(typeNames);
    };

      fetchTypes();
    }, []);


return (
    <Stack direction="row" spacing={1} sx={{ justifyContent:'center' ,alignItems: 'center', marginTop:'1rem' }}>
        {types.map((type) => (
            <ColorChip key={type} label={type} variant='outlined' onClick={()=> handleClick(type)} />
        ))}
    </Stack>
)
}

export default Chips