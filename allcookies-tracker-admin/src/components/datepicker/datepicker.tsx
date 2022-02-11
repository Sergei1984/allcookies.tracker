import {Dispatch, FC, SetStateAction, useState} from "react";
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import moment, { Moment } from 'moment'
import Box from "@mui/material/Box";
import {IconButton} from "@mui/material";
import {CalendarIcon} from "../../assets/icons";
import 'moment/locale/ru';
import PickersDay, {PickersDayProps, pickersDayClasses} from "@mui/lab/PickersDay";

interface DatepickerProps {
  selectedDate: Moment | null
  setSelectedDate: Dispatch<SetStateAction<Moment | null>>
}

const Datepicker:FC<DatepickerProps> = ({selectedDate, setSelectedDate}) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false)

  const renderWeekPickerDay = (
      date: Moment,
      selectedDates: Array<Moment | null>,
      pickersDayProps: PickersDayProps<Moment>
  ) => {

    return (
        <PickersDay
            {...pickersDayProps}
            sx={{
              [`&&.${pickersDayClasses.selected}`]: {
                backgroundColor: "#27AE60"
              }
            }}
        />
    );
  };

  return (
      <LocalizationProvider dateAdapter={DateAdapter} locale={moment.locale('ru')}>
        <DatePicker
            value={selectedDate}
            open={isDatePickerOpen}
            onChange={(newValue) => {
              setIsDatePickerOpen(false)
              setSelectedDate(newValue);
            }}
            inputFormat={'DD.MM.YYYY'}
            mask={'__.__.____'}

            renderDay={renderWeekPickerDay}

            renderInput={({inputRef, inputProps}) => (
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mt: 0,
                  p: '10px',
                  position: 'relative',
                }}>
                  <input className={'dropdown-header'} style={{marginTop: 0, width: 'auto'}} ref={inputRef} {...inputProps} />
                  <IconButton
                      sx={{
                        position: 'absolute',
                        right: '10px'
                      }}
                      onClick={() => setIsDatePickerOpen(true)}
                  >
                    <CalendarIcon/>
                  </IconButton>
                </Box>
            )}
        />
      </LocalizationProvider>
  );

};
export default Datepicker
