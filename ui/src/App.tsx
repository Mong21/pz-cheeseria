import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";

import { Cheese, MediaCard } from "./components/MediaCard";
import { CheeseDialog } from "./components/CheeseDialog";
import { CHEESE_URL } from "./constants";

const App: React.FC = () => {
  const [cheeses, setCheeses] = useState<Cheese[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const readCheese = async () => {
    try {
      const { data } = await axios.get(CHEESE_URL);
      const { cheeses } = data;

      const result: Cheese[] = Object.keys(cheeses).map((id) => {
        const { name, url, pricePerKilo, colour } = cheeses[id];

        return {
          id,
          name,
          url,
          pricePerKilo,
          colour,
        };
      });

      setCheeses(result);
    } catch (err) {
      console.log(err);
    }
  };

  const createCheese = async (cheese: Omit<Cheese, "id">) => {
    try {
      const { name, url, pricePerKilo, colour } = cheese;
      await axios.post(CHEESE_URL, {
        name,
        url,
        pricePerKilo,
        colour,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    readCheese();
  }, []);

  return (
    <Box sx={{ padding: 8 }}>
      <Typography sx={{ paddingBottom: 8 }} variant="h4" align="center">
        Welcome to Cheeseria
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {cheeses.map((cheese) => (
            <Grid item xs={2} md={4} key={cheese.id}>
              <MediaCard
                id={cheese.id}
                name={cheese.name}
                url={cheese.url}
                pricePerKilo={cheese.pricePerKilo}
                colour={cheese.colour}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Button
          sx={{ marginTop: 2 }}
          startIcon={<AddIcon />}
          onClick={() => {
            setOpen(true);
          }}
          variant="contained"
        >
          Add Cheese
        </Button>
      </Box>
      {open && (
        <CheeseDialog
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          onCreate={(cheese) => {
            createCheese(cheese);
            setOpen(false);
          }}
        />
      )}
    </Box>
  );
};

export default App;
