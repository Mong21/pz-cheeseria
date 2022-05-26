import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Slider,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

import { CheeseDialog } from "./CheeseDialog";
import { CHEESE_URL } from "../constants";

export interface Cheese {
  id: string;
  name: string;
  url: string;
  pricePerKilo: number;
  colour: string;
}

const marks = [
  {
    value: 0,
    label: "0kg",
  },
  {
    value: 50,
    label: "50kg",
  },
  {
    value: 100,
    label: "100kg",
  },
];

export const MediaCard: React.FC<Cheese> = ({
  id,
  name,
  url,
  pricePerKilo,
  colour,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);

  const editCheese = async (cheese: Cheese) => {
    try {
      const { id, name, url, pricePerKilo, colour } = cheese;
      await axios.put(CHEESE_URL, {
        id,
        name,
        url,
        pricePerKilo,
        colour,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCheese = async (id: string) => {
    try {
      await axios.delete(CHEESE_URL, {
        data: {
          id,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (value: number | number[]) => {
    if (typeof value === "number") setValue(value as number);
  };

  return (
    <Card sx={{ width: 320 }} variant="outlined">
      <CardMedia component="img" height="240" image={url} alt={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${pricePerKilo} per kilogram
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Colour: {colour}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Total Price: ${pricePerKilo * value}
        </Typography>
        <Box sx={{ width: 280, marginTop: 5 }}>
          <Slider
            defaultValue={0}
            step={1}
            marks={marks}
            value={value}
            onChange={(_, value) => handleChange(value)}
            valueLabelDisplay={`${value ? "on" : "off"}`}
          />
        </Box>
      </CardContent>
      <CardActions>
        <Button
          startIcon={<EditIcon />}
          onClick={() => {
            setOpen(true);
          }}
          size="small"
        >
          Edit
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          onClick={() => {
            deleteCheese(id);
          }}
          size="small"
        >
          Delete
        </Button>
      </CardActions>
      {open && (
        <CheeseDialog
          open={open}
          cheese={{ id, name, url, pricePerKilo, colour }}
          onClose={() => {
            setOpen(false);
          }}
          onEdit={(cheese) => {
            editCheese(cheese);
            setOpen(false);
          }}
        />
      )}
    </Card>
  );
};
