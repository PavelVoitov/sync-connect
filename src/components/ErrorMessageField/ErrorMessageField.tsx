import {Typography} from "@mui/material";
import {ErrorMessage} from "formik";
import React from "react";
import s from './ErrorMessageField.module.css'

export const ErrorMessageField = () => {
  return (
		<div className={s.errorMessageField}>
			<ErrorMessage name="apiTokenInstance" component="div">
				{(msg) => (
					<Typography variant="body2" color="error">
						{msg}
					</Typography>
				)}
			</ErrorMessage>
		</div>

	)
}
