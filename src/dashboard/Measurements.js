import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MeasurementsTable from "./MeasurementsTable";
import MeasurementsForm from "./MeasurementsForm";

import clsx from "clsx";
import useStyles from "./DashBoardStyles";
import {
  getAllMeasurements,
  getIntervalMeasurements,
  addMeasurements,
  deleteMeasurementById,
} from "../data-service/MeasurementsDataService";

export default function Measurements() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [measurements, setMeasurements] = useState([]);
  const [editItemData, setEditItemData] = useState();

  useEffect(() => {
    getAllMeasurements().then((data) => {
      setMeasurements(data);
    });
  }, []);

  const deleteItemById = (id) => {
    deleteMeasurementById(id).then((result) => {
      if (result) {
        setMeasurements(measurements.filter((item) => item.id !== id));
      }
    });
  };

  const selectItemId = (id) => {
    let result = measurements.filter((item) => item.id === id);
    setEditItemData(result[0]);
  };

  const saveMeasurement = (measurement) => {
    addMeasurements(measurement).then((result) => {
      if (result) {
        setMeasurements([...measurements.filter((item) => item.id !== result.id), result]);
      }
    });
  };

  return (
    <div>
      <MeasurementsForm
        saveMeasurement={saveMeasurement}
        editItemData={editItemData}
      />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <MeasurementsTable
              data={measurements}
              deleteItemById={deleteItemById}
              selectItemId={selectItemId}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

/*
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <Chart />
          </Paper>
        </Grid>
 
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <Deposits />
          </Paper>
        </Grid>
*/
