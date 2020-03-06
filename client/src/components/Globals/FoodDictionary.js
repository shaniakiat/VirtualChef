import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useInput
} from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import fetch from "cross-fetch";

function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}
//to do for shania : make the state save after the user enters food or clicks the label.
//then pass that state to the api endpoint

export default function FoodDictionary() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await fetch(
        "https://floating-plains-35923.herokuapp.com/dictionary"
      );
      await sleep(1e3); // For demo purposes.
      const food = await response.json();

      if (active) {
        // console.log(Object.keys(food).map(key => food[key]));
        setOptions(Object.keys(food).map(key => food[key]));
        // setOptions(Object.keys(countries).map(key => countries[key].item[0]));
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={option => option} //i dont know what this line does!
      getOptionLabel={option => option}
      options={options}
      loading={loading}
      renderInput={params => (
        <TextField
          {...params}
          label="Enter your food!"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  );
}
