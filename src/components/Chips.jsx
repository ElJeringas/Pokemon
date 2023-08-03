import { Chip, Stack } from '@mui/material';
import { useState, useEffect } from 'react'
import { pink, yellow } from '@mui/material/colors';
import { Link } from 'react-router-dom';

function Chips() {
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState('');

    const handleClick = (type)=>{
        setSelectedType((prevType) => (prevType === type ? '' : type));
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
            <Link  key={type} to={{ pathname: `/pokemon/type/${type}`, state: { type } }} style={{ textDecoration: 'none', color: '#000' }}>
                <Chip
                key={type}
                label={type}
                variant='outlined'
                style={{
                        color: selectedType === type ? 'white' : 'black',
                        backgroundColor: selectedType === type ? pink[900] : yellow[200],
                    }}
                selected={selectedType === type}
                onClick={()=> handleClick(type)} />
            </Link>
        ))}
    </Stack>
)
}

export default Chips