import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { GET, PUT } from "../extras/api";
import { setLoadingTrue, setLoadingFalse } from "../redux/user";
import CONSTANTS from "../extras/constants.json";
import TimesheetInputField from "../components/TimesheetInputField";
import CustomButton from "../components/CustomButton";
import {
	AssignmentsObject,
	TimesheetObject,
	DatesObject,
	week,
} from "../extras/interfaces";
import CustomSingleSelect from "../components/CustomSingleSelect";
import CustomFieldset from "../components/CustomFieldset";
import FloatInputField from "../components/FloatInputField";
import CustomPopup from "../components/CustomPopup";

const TimeSheet = () => {
	useEffect(() => {
		reload();
	}, []);

	const user = useSelector((_: any) => _.user);
	const dispatch = useDispatch();

	const [hours, setHours] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
	const [disabledArray, setDisabledArray] = useState<boolean[]>([
		false,
		false,
		false,
		false,
		false,
		false,
		false,
	]);
	const [AssignmentId, setAssignmentId] = useState<AssignmentsObject>();
	const [Assignments, setAssignments] = useState<AssignmentsObject[]>([]);
	const [TimesheetId, setTimesheetId] = useState<DatesObject>();
	const [message, setMessage] = useState<string>("");
	const [header, setHeader] = useState<string>("");
	const [week, setWeek] = useState<Date[]>([]);
	const [dates, setDates] = useState<DatesObject[]>([]);
	const [PeriodEndDate, setPeriodEndDate] = useState<Date>();
	const [newStatus, setNewStatus] = useState<number>(0);
	const [Status, setStatus] = useState<number>(0);
	const [statusLabel, setStatusLabel] = useState<string>("");
	const [developer, setDeveloper] = useState<string>();
	const [disabled, setDisabled] = useState(true);
	const [popup, setPopup] = useState(false);
	const [singleButton, setSingleButton] = useState<boolean>(false);

	const setSLabel = (Status: number) => {
		if (Status === 0) {
			setStatusLabel("Unsubmitted");
		} else if (Status === 1) {
			setStatusLabel("Saved");
		} else if (Status === 2) {
			setStatusLabel("Submitted");
		} else if (Status === 3) {
			setStatusLabel("Approved");
		} else {
			setStatusLabel("Unknown");
		}
	};

	const openPopup = async (newStatus: string) => {
		let message = "Are you sure you want to save this timesheet?";
		let header = "Save";
		let newStatusCode = 1;

		if (newStatus === "Save") {
			message = "Are you sure you want to save this timesheet?";
			header = "Save";
			newStatusCode = 1;
		} else if (newStatus === "Submit") {
			message = "Are you sure you want to submit this timesheet?";
			header = "Submit";
			newStatusCode = 2;
		} else if (newStatus === "Cancel") {
			message =
				"Are you sure you want to withdaw the submitted timesheet and save instead?";
			header = "Cancel";
			newStatusCode = 1;
		}

		setSingleButton(false);
		setMessage(message);
		setHeader(header);
		setNewStatus(newStatusCode);
		setPopup(true);
	};

	const checkPreviousTimesheet = () => {
		let i;

		for (i = dates?.length - 1; i >= 0; i--) {
			if (
				dates[i].Status === 0 ||
				dates[i].Status === 1 ||
				dates[i].TimesheetId === TimesheetId?.TimesheetId
			) {
				break;
			}
		}

		if (
			dates[i].TimesheetId !== TimesheetId?.TimesheetId &&
			header !== "Cancel" &&
			header !== "Save"
		) {
			setMessage(`You cannot submit new timesheet before submitting the previous one(s). 
			Please submit timesheet for the period ${dates[i]?.label} first.`);
			setHeader("Submit Previous Timesheet(s)");
			setSingleButton(true);
			setPopup(true);
			return true;
		}
		return false;
	};

	const handleSubmit = async () => {
		if (checkPreviousTimesheet()) {
			return;
		}

		try {
			dispatch(setLoadingTrue());

			const tempData: TimesheetObject = {
				TimesheetId: TimesheetId ?? 0,
				AssignmentId: AssignmentId ?? 0,
				PeriodEndDate: PeriodEndDate ?? new Date(),
				Status: newStatus,
				Monday: hours[0],
				Tuesday: hours[1],
				Wednesday: hours[2],
				Thursday: hours[3],
				Friday: hours[4],
				Saturday: hours[5],
				Sunday: hours[6],
			};

			const data = await PUT(CONSTANTS.UPDATE_TIMESHEET, tempData);

			if (data) {
				if (newStatus === 1) {
					alert("Timesheet Saved");
				} else if (newStatus === 2) {
					alert("Timesheet Submitted");
				} else {
					alert("Incorrect Request");
				}
				customReload();
			} else {
				alert(data);
			}
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(setLoadingFalse());
		}
	};

	function getWeekDates(PeriodEndDate: Date) {
		let currentDate = new Date(PeriodEndDate);

		const currentDayOfWeek = currentDate.getDay();

		const difference = currentDayOfWeek - 0;

		const firstDayOfWeek = new Date(currentDate);
		firstDayOfWeek.setDate(currentDate.getDate() - difference);

		const weekDates = [];

		for (var i = 6; i >= 0; i--) {
			currentDate = new Date(firstDayOfWeek);
			currentDate.setDate(firstDayOfWeek.getDate() - i);
			weekDates.push(currentDate);
		}

		setWeek(weekDates);
	}

	async function getTimesheet(TimesheetId?: number) {
		const data: TimesheetObject = await GET(CONSTANTS.GET_TIMESHEET, {
			TimesheetId,
		});

		getWeekDates(data.PeriodEndDate);

		const arr = [...hours];

		CONSTANTS.WEEK_DAYS.forEach((day: string, index: number) => {
			arr[index] = (data as any)[day];
		});

		setHours(arr);

		setStatus(data.Status);
		setSLabel(data.Status);
		setNewStatus(data?.Status);
		setPeriodEndDate(data.PeriodEndDate);
		setDisabled(data?.Status === 2 || data?.Status === 3);

		return data;
	}

	async function getDates(AssignmentId?: number) {
		const data: DatesObject[] = await GET(CONSTANTS.GET_DATES, {
			AssignmentId,
		});
		setDates(data);
		return data;
	}

	async function getAssignments() {
		const data: AssignmentsObject[] = await GET(CONSTANTS.GET_ASSIGNMENTS, {
			UserId: user?.UserId,
		});

		setAssignments(data);
		return data;
	}

	async function reloadDates(AssignmentId?: number) {
		const datesData = await getDates(AssignmentId);
		let TimesheetId = datesData?.[datesData?.length - 1];

		for (let i = datesData?.length - 1; i >= 0; i--) {
			if (datesData[i].Status === 1 || datesData[i].Status === 0) {
				TimesheetId = datesData[i];
				break;
			}
		}

		setTimesheetId(TimesheetId);
		await getTimesheet(Number(TimesheetId?.TimesheetId));
	}

	const customReload = async () => {
		const datesData = await getDates(AssignmentId?.AssignmentId);
		await getTimesheet(TimesheetId?.TimesheetId);

		setTimesheetId(
			datesData.filter((e) => TimesheetId?.TimesheetId === e.TimesheetId)[0]
		);
	};

	async function reload() {
		const assignmentData = await getAssignments();
		setAssignmentId(assignmentData?.[0]);

		await reloadDates(assignmentData?.[0]?.AssignmentId);

		setDeveloper(assignmentData?.[0]?.Email);

		setDisabled(user?.UserId !== assignmentData?.[0]?.UserId);
	}

	if (!user?.UserId) {
		return <Navigate to="/login" replace={true} />;
	}

	return (
		<div className="page">
			<CustomFieldset legend="Select Assignment & Date">
				<div className="flex flex-row gap-3">
					<CustomSingleSelect
						id={"assignmentId"}
						value={AssignmentId}
						options={Assignments}
						onChange={(e: any) => {
							setAssignmentId(e.value);
							reloadDates(e.value?.AssignmentId);
						}}
						filter
						optionLabel={"label"}
						className=""
					/>

					<CustomSingleSelect
						id={"timesheetId"}
						value={TimesheetId}
						options={dates}
						onChange={(e: any) => {
							setTimesheetId(e.value);
							getTimesheet(e.value?.TimesheetId);
						}}
						filter
						optionLabel={"label"}
						className=""
					/>
				</div>

				<div className="flex flex-row margintop10px gap-3">
					<div className="flex flex-row">
						<label
							id="labelStatus"
							htmlFor="status"
							className="marginright10px margintop10px"
						>
							Status:
						</label>

						<FloatInputField
							id="status"
							value={statusLabel}
							disabled
							fieldClassName="width200px"
						/>
					</div>

					<div className="flex flex-row">
						<label
							id="labelPrimaryAuthoriser"
							htmlFor="primaryAuthoriser"
							className="marginright10px margintop10px"
						>
							Primay Authoriser:
						</label>

						<FloatInputField
							id="primaryAuthoriser"
							value={statusLabel}
							disabled
							fieldClassName="width200px"
						/>
					</div>

					<div className="flex flex-row">
						<label
							id="labelSecondayAuthoriser"
							htmlFor="secondaryAuthoriser"
							className="marginright10px margintop10px"
						>
							Secondary Authoriser:
						</label>

						<FloatInputField
							id="secondaryAuthoriser"
							value={statusLabel}
							disabled
							fieldClassName="width200px"
						/>
					</div>

					{user.RoleId === 1 && false ? (
						<>
							<label
								id="labelDeveloper"
								htmlFor="developer"
								className="marginright10px margintop10px"
							>
								Developer -
							</label>

							<FloatInputField
								id="developer"
								value={developer}
								disabled
								fieldClassName="width300px"
							/>
						</>
					) : (
						<></>
					)}
				</div>
			</CustomFieldset>

			{PeriodEndDate ? (
				<CustomFieldset legend="Timesheet" className="margintop10px">
					<div className="timesheet">
						<table>
							<thead>
								<tr key={"hr"}>
									{week.map((day: any) => {
										return (
											<th key={day.toDateString()}>
												{day.toUTCString().substring(0, 11)}
											</th>
										);
									})}
								</tr>
							</thead>

							<tbody>
								<tr key={"br"}>
									{week.map((day, i: any) => (
										<td key={"td2" + day}>
											<TimesheetInputField
												id={"field" + day}
												value={hours[i]}
												setter={(e: any) => {
													const arr = [...hours];
													arr[i] = Number(e.target.value);
													setHours(arr);
												}}
												type="number"
												className="width100px"
												min={0}
												step="0.25"
												index={i}
												disabled={disabled || disabledArray[i]}
											/>
										</td>
									))}
								</tr>
							</tbody>
						</table>

						<div className="flex flex-row justify-content-center">
							{Status === 0 || Status === 1 ? (
								<CustomButton
									id="timeSheetSave"
									label="Save"
									onClick={() => openPopup("Save")}
									className=""
									visible={!disabled}
									loading={user.loading}
								/>
							) : (
								<></>
							)}

							{Status === 0 || Status === 1 ? (
								<CustomButton
									id="timeSheetSubmit"
									label="Submit"
									onClick={() => openPopup("Submit")}
									className="marginleft10px"
									severity="info"
									visible={!disabled}
									loading={user.loading}
								/>
							) : (
								<></>
							)}

							{Status === 2 ? (
								<CustomButton
									id="timeSheetCancel"
									label="Cancel Submission"
									onClick={() => openPopup("Cancel")}
									className="marginleft10px"
									severity="danger"
									loading={user.loading}
								/>
							) : (
								<></>
							)}
						</div>
					</div>
				</CustomFieldset>
			) : (
				<></>
			)}

			<CustomPopup
				header={header}
				message={message}
				singleButton={singleButton}
				callback={handleSubmit}
				visible={popup}
				toggle={setPopup}
			/>
		</div>
	);
};

export default TimeSheet;
