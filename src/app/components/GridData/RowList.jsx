import React, { useState } from 'react'
import moment from 'moment';
import SchoolIcon from '@mui/icons-material/School';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupsIcon from '@mui/icons-material/Groups';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import NewProject from '../NewProject/NewProject';
import { Box, Icon } from '@mui/material';
import LocationCityIcon from '@mui/icons-material/LocationCity';

const styleGrid = {
    border: "1.5px solid #AFAFAF",
    width: "100%",
    fontSize: "14px",
    padding: "8px 6px",
    minWidth: "20px",
}

export const RowList = ({ row, index, data, setMutate }) => {

    const getIcon = (icon) => {
        switch (icon) {
            case 1:
                return <SchoolIcon />
            case 2:
                return <LocalHospitalIcon />
            case 3:
                return <LocationCityIcon />
            default:
                return <SchoolIcon />
        }
    }


    const [show, setShow] = useState(false);

    const formatDate = (date) => {
        return moment(date).format('DD/MM/YYYY');
    }

    return (
        <div key={index}>
            {row.parent_id === 0 &&

                <div style={{
                    width: "100%",
                    display: "flex"
                }}>

                    <Box sx={{ ...styleGrid, width: "5%", minWidth: "50px" }}>
                        {row.id}
                    </Box>
                    <Box sx={{ ...styleGrid, width: "5%", minWidth: "50px" }}>
                        <Icon >{getIcon(row.type_id)}</Icon>
                    </Box>
                    <Box sx={{ ...styleGrid, minWidth: "180px", width: "20%" }}>
                        <div style={{
                            display: "flex", justifyContent: "space-between",
                        }}>
                            <span>{row.name}</span>
                            {!show ? <KeyboardArrowDownIcon onClick={() => setShow(!show)} sx={{ cursor: "pointer" }} /> :
                                <KeyboardArrowLeftIcon onClick={() => setShow(!show)} sx={{ cursor: "pointer" }} />}

                        </div>
                    </Box>
                    <Box sx={{ ...styleGrid, minWidth: "100px", width: "10%" }}>
                        {row.ubication}
                    </Box>
                    <Box sx={{ ...styleGrid, minWidth: "150px", width: "10%" }}>
                        {row.manager}
                    </Box>
                    <Box sx={{ ...styleGrid, minWidth: "120px", width: "15%" }}>
                        {formatDate(row.createdAt)}
                    </Box>
                    <Box sx={{ ...styleGrid, minWidth: "120px", width: "15%" }}>
                        {formatDate(row.updatedAt)}
                    </Box>
                    <Box sx={{ ...styleGrid, minWidth: "150px", width: "20%" }}>
                        {row.client}
                    </Box>
                    <Box sx={{ ...styleGrid, minWidth: "50px", width: "10%" }}>
                        <NewProject onRow data={row} setMutate={setMutate} />
                        <GroupsIcon />
                        <DeleteIcon />
                    </Box>
                </div>

            }
            {show && data.map((
                row2, index) => {
                return (
                    <div key={index}>
                        {row2.parent_id == row.id &&
                            <div style={{
                                width: "100%",
                                display: "flex",
                                background: "#F3F6F9"
                            }}>

                                <Box sx={{ ...styleGrid, width: "5%", minWidth: "50px" }}>
                                    {row2.id}
                                </Box>
                                <Box sx={{ ...styleGrid, width: "5%", minWidth: "50px" }}>
                                    <Icon >{getIcon(row2.type_id)}</Icon>
                                </Box>
                                <Box sx={{ ...styleGrid, minWidth: "180px", width: "20%" }}>
                                    {row2.name}
                                </Box>
                                <Box sx={{ ...styleGrid, minWidth: "100px", width: "10%" }}>
                                    {row2.ubication}
                                </Box>
                                <Box sx={{ ...styleGrid, minWidth: "150px", width: "10%" }}>
                                    {row2.manager}
                                </Box>
                                <Box sx={{ ...styleGrid, minWidth: "120px", width: "15%" }}>
                                    {formatDate(row2.createdAt)}
                                </Box>
                                <Box sx={{ ...styleGrid, minWidth: "120px", width: "15%" }}>
                                    {formatDate(row2.updatedAt)}
                                </Box>
                                <Box sx={{ ...styleGrid, minWidth: "150px", width: "20%" }}>
                                    {row2.client}
                                </Box>
                                <Box sx={{ ...styleGrid, minWidth: "50px", width: "10%" }}>
                                    <NewProject onRow data={row2} setMutate={setMutate} />
                                    <GroupsIcon />
                                    <DeleteIcon />
                                </Box>
                            </div>
                        }
                    </div>
                )
            }
            )}
        </div >
    )
}