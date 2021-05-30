import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function MeasurementsForm({ saveMeasurement, editItemData }) {
  const [timestamp, setTimestamp] = useState(
    new Date().toISOString().substring(0, 17) + "00"
  );
  const [id, setId] = useState();
  const [weight, setWeight] = useState(0);
  const [abdomenSize, setAbdomenSize] = useState(0);
  const [chestSize, setChestSize] = useState(0);
  const [leftHandSize, setLeftHandSize] = useState(0);
  const [rightHandSize, setRightHandSize] = useState(0);
  const [leftLegSize, setLeftLegSize] = useState(0);
  const [rightLegSize, setRightLegSize] = useState(0);

  const classes = useStyles();

  useEffect(() => {
    if (editItemData) {
      setId(editItemData.id);
      setTimestamp(editItemData.timestamp);
      setWeight(editItemData.weight);
      setAbdomenSize(editItemData.abdomenSize);
      setChestSize(editItemData.chestSize);
      setLeftHandSize(editItemData.leftHandSize);
      setRightHandSize(editItemData.rightHandSize);
      setLeftLegSize(editItemData.leftLegSize);
      setRightLegSize(editItemData.rightLegSize);
    }
  }, [editItemData]);

  const submit = () => {
    console.log("test");
    saveMeasurement({
      id,
      timestamp,
      weight,
      abdomenSize,
      chestSize,
      leftHandSize,
      rightHandSize,
      leftLegSize,
      rightLegSize,
    });
  };

  return (
    <div>
      <div className="container-flex">
        <h1>Measurements</h1>
      </div>
      <div>
        <form className={classes.container} noValidate>
          <TextField
            id="datetime-local"
            label="Date time"
            type="datetime-local"
            value={timestamp}
            className={classes.textField}
            onChange={(e) => setTimestamp(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
        <div className="container-flex">
          <TextField
            variant="outlined"
            margin="normal"
            required
            width="10px"
            id="weight"
            label="Weight"
            name="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="abdomenSize"
            label="Abdomen size"
            name="abdomenSize"
            value={abdomenSize}
            onChange={(e) => setAbdomenSize(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="chestSize"
            label="Chest size"
            name="chestSize"
            value={chestSize}
            onChange={(e) => setChestSize(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="leftHandSize"
            label="Left hand size"
            name="leftHandSize"
            value={leftHandSize}
            onChange={(e) => setLeftHandSize(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="rightHandSize"
            label="Right hand size"
            name="rightHandSize"
            value={rightHandSize}
            onChange={(e) => setRightHandSize(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="leftLegSize"
            label="Left leg size"
            name="leftLegSize"
            value={leftLegSize}
            onChange={(e) => setLeftLegSize(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            weight="5px"
            id="rightLegSize"
            label="Right leg size"
            name="rightLegSize"
            value={rightLegSize}
            onChange={(e) => setRightLegSize(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={submit}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default MeasurementsForm;
