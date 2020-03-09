import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
// import "../Styles/Predictions.css";

const FoodDictionary = ({
  open,
  setOpen,
  options,
  loading,
  userFood,
  setUserFood
}) => {
  return (
    <Autocomplete
      className="auto-complete"
      id="asynchronous-demo"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(e, v) => setUserFood(v)}
      getOptionSelected={option => option} //i dont know what this line does!
      getOptionLabel={option => option}
      options={options}
      loading={loading}
      renderInput={params => (
        <TextField
          {...params}
          label="Enter Your Food!"
          variant="outlined"
          InputPrrops={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  "Please Enter Your Food"
                )}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  );
};
export default FoodDictionary;
