import './App.css';
import { Box, Button, Container, Stack } from '@mui/material';
import SquarBox from './components/SquarBox';
import { Reorder } from "framer-motion"
import { useEffect, useState } from 'react';


function App() {

  const randomString = () => {
    return Math.random().toString(36).substring(7);
  }

  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [secondorySelectedItem, setSecondorySelectedItem] = useState(null);

  useEffect(() => {
    // Generate 10 random items
    const newItems = Array.from({ length: 5 }, () => ({
      id: randomString(),
      text: Math.floor(Math.random() * 100)
    }));
    setItems(newItems);
  }, []);

const shuffleItems = async () => {
  const newItems = [...items];
  for (let i = newItems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap items
    [newItems[i], newItems[j]] = [newItems[j], newItems[i]];
    // Add a delay of 0.5 seconds
    await delay(100);
    setItems([...newItems]);
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const bubbleSort = async () => {
  const n = items.length;
  const newItems = [...items];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Compare using the `text` property
        await delay(500);
        setSelectedItem(newItems[j]);
        await delay(500);
        setSecondorySelectedItem(newItems[j + 1]);
        
      if (newItems[j].text > newItems[j + 1].text) {
        // Add a delay before each swap
        await delay(1000);
        const temp = newItems[j];
        newItems[j] = newItems[j + 1];
        newItems[j + 1] = temp;
        setItems([...newItems]);
      }
    }
    setSelectedItem(null);
    setSecondorySelectedItem(null);
  }
  setSecondorySelectedItem(null);
  setSelectedItem(null);
}

const addRandomItem = () => {
  const newItems = [...items];
  const newItem = {
    id: randomString(), // Assuming randomString() is a function that generates a random string
    text: Math.floor(Math.random() * 100) // Generates a random number between 0 and 99
  };
  newItems.push(newItem);
  setItems(newItems);
}

  return (
    <div style={{ backgroundColor: 'gray' }}>
      <Container 
        sx={{
          height: '100vh', // Make Container fill the viewport height
        }}>
          <Stack>
              <Box sx={
                {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '12px',
                  height: '10vh'
                }
              }>
                <Button onClick={shuffleItems} variant="contained">Suffle</Button>
                <Button onClick={bubbleSort} variant="contained">Bubble Sort</Button>
                <Button onClick={addRandomItem} variant="contained">Add Random Item</Button>
              </Box>

              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                height: '90vh',
                overflow: 'auto',
              }}>
                <Reorder.Group 
                  axis='x'
                  values={items} onReorder={setItems}
                  onSeeking={(newValues) => {
                    console.log(newValues);
                  }
                  }
                  >
                    <Box 
                      sx={{ 
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '8px', // Reduced gap between items
                      }}>
                  {
                    items.map((item) => {
                      return (
                        <Reorder.Item as='ul' key={item.id} value={item}>
                          <SquarBox 
                            key={item.id} 
                            text={item.text} 
                            height={100} 
                            selected={selectedItem && selectedItem.id === item.id ? true : false}
                            secondorySelected={secondorySelectedItem && secondorySelectedItem.id === item.id ? true : false}
                          />
                        </Reorder.Item>
                      );
                    })
                  }
                  </Box>
                </Reorder.Group>
              </Box>
          </Stack>
      </Container>
    </div>
  );
}

export default App;
