import React, { useState } from "react";
import { Box, Button, TextField, DialogTitle, Dialog } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { Cheese } from "./MediaCard";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate?: (cheese: Omit<Cheese, "id">) => void;
  onEdit?: (cheese: Cheese) => void;
  cheese?: Cheese;
}

export const CheeseDialog: React.FC<Props> = ({
  open,
  onClose,
  onCreate,
  onEdit,
  cheese,
}) => {
  const [id] = useState<string>(cheese?.id || "");
  const [name, setName] = useState<string>(cheese?.name || "");
  const [url, setUrl] = useState<string>(cheese?.url || "");
  const [ppk, setPpk] = useState<number>(cheese?.pricePerKilo || 0);
  const [colour, setColour] = useState<string>(cheese?.colour || "");

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="xs">
      <DialogTitle>{`${cheese ? "Edit" : "Add"} cheese details`}</DialogTitle>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
      >
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          focused
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextField
          label="URL"
          variant="outlined"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        <TextField
          label="Price Per Kilograms"
          variant="outlined"
          value={ppk}
          type="number"
          onChange={(e) => {
            setPpk(Number(e.target.value));
          }}
          InputProps={{
            inputProps: { min: 0 },
          }}
        />
        <TextField
          label="Colour"
          variant="outlined"
          value={colour}
          onChange={(e) => {
            setColour(e.target.value);
          }}
        />
      </Box>

      <Button
        startIcon={<AddIcon />}
        onClick={() => {
          if (cheese && onEdit) {
            onEdit({
              id,
              name,
              url,
              pricePerKilo: ppk,
              colour,
            });
          }

          if (!cheese && onCreate) {
            onCreate({
              name,
              url,
              pricePerKilo: ppk,
              colour,
            });
          }
        }}
        variant="contained"
      >
        {`${cheese ? "Edit cheese" : "Add cheese"}`}
      </Button>
    </Dialog>
  );
};
