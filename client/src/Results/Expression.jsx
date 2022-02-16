import React from 'react';
import List from '@mui/material/List';
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import {grey} from "@mui/material/colors";
import ListItemText from "@mui/material/ListItemText";
import IconTypes from "./IconTypes";
import Paper from "@mui/material/Paper";
import "./ResultList.css";
import {groupBy} from "lodash";
import {ListItemSecondaryAction} from "@mui/material";
import ListItemButton from '@mui/material/ListItemButton';
import Manifestation from "./Manifestation";
import {useRecoilState} from 'recoil';
import {itemSelectedState, showUriState} from "../state/state";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import AvatarGroup from '@mui/material/AvatarGroup';
import Badge from '@mui/material/Badge';
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";

function isEmpty(str) {
    return (!str || str.length === 0 );
}

export default function Expression(props){
    const [showUri] = useRecoilState(showUriState);
    const [itemSelected, setItemSelected] = useRecoilState(itemSelectedState)
    const {uri} = props.expression;

    //console.log("Expression : " + props.checkboxes);
    const worktitle = !isEmpty(props.expression.work[0].title) ? props.expression.work[0].title : "";

    const titles = [];
    if (!isEmpty(props.expression.titlepreferred)) titles.push(props.expression.titlepreferred);
    if (!isEmpty(props.expression.title)) titles.push(props.expression.title);
    //if (!isEmpty(props.expression.titlevariant)) titles.push(props.expression.titlevariant);
    const title = titles[0];

    const isTranslation = titles.find(element => element.toLowerCase().replace(/[^a-z]/g, '').includes(worktitle.toLowerCase().replace(/[^a-z]/g, '')))
    //console.log(worktitle.toLowerCase().replace(/[^a-z]/g, ''));
    const creatorsmap = groupBy(props.expression.work[0].creatorsConnection.edges, a => a.role);
    const creators = [];
    creatorsmap.Author && creators.push(["Author: ", (creatorsmap.Author.map(a => a.node.name)).join(" ; ")]);
    creatorsmap.Creator && creators.push(["Creator: ", (creatorsmap.Creator.map(a => a.node.name)).join(" ; ")]);
    creatorsmap.Artist && creators.push(["Artist: ", (creatorsmap.Artist.map(a => a.node.name)).join(" ; ")]);
    creatorsmap.Director && creators.push(["Director: ", (creatorsmap.Director.map(a => a.node.name)).join(" ; ")]);
    creatorsmap.Producer && creators.push(["Producer: ", (creatorsmap.Producer.map(a => a.node.name)).join(" ; ")]);
    creatorsmap.Composer && creators.push(["Composer: ", (creatorsmap.Composer.map(a => a.node.name)).join(" ; ")]);
    creatorsmap.Lyricist && creators.push(["Lyricist: ", (creatorsmap.Lyricist.map(a => a.node.name)).join(" ; ")]);
    //console.log(creators)

    const contributorsmap = groupBy(props.expression.creatorsConnection.edges, a => a.role);
    const contributors = [];
    contributorsmap.Translator && contributors.push(["Translator: ", (contributorsmap.Translator.map(a => a.node.name)).join(" ; ")]);
    contributorsmap.Narrator && contributors.push(["Narrator: ", (contributorsmap.Narrator.map(a => a.node.name)).join(" ; ")]);
    contributorsmap.Abridger && contributors.push(["Abridger: ", (contributorsmap.Abridger.map(a => a.node.name)).join(" ; ")]);
    contributorsmap.Editor && contributors.push(["Editor: ", (contributorsmap.Editor.map(a => a.node.name)).join(" ; ")]);
    const language = props.expression.language.map(l => l.label);
    const content = props.expression.content.map(c => c.label);
    content.sort();
    content.reverse();

    const handleClick = () => {
        console.log(itemSelected);
        const pos = itemSelected.indexOf(uri)
        if (pos === -1) {
            setItemSelected([...itemSelected, uri]);
        } else {
            setItemSelected([...itemSelected.slice(0, pos), ...itemSelected.slice(pos + 1)]);
        }
    };

    return <Paper elevation={0} square className={"expression"} key={props.expression.uri} sx={{mt: 2}}>
        <ListItemButton alignItems="flex-start" onClick={handleClick}>
            <ListItemIcon>

                    <Badge color="success" badgeContent={'✓'} invisible={itemSelected.includes(uri) === false}>
                        <IconTypes type={content[0]}/>
                    </Badge>


            </ListItemIcon>
            <ListItemText className={"expressionheading"} sx={{width: '20%'}}
                          primary={<React.Fragment>
                              <span className={"expressiontitle"}>{title}</span>
                              {!isTranslation && <span className={"worktitle"}> ({worktitle})</span>}
                              <br/>
                              {creators.slice(0,2).map(creator => <div className={"creatorname"} key={creator[0] + creator[1]}>{creator[0] + creator[1]}</div>) }
                              {contributors.slice(0,2).map(contributor => <div className={"creatorname"} key={contributor[0] + contributor[1]}>{contributor[0] + contributor[1]}</div>) }
                              {showUri && <div className={"creatorname"}>{props.expression.uri}</div>}
                          </React.Fragment>}
            />
            <ListItemSecondaryAction sx={{top:"0%", marginTop:"35px", width: '20%', textAlign: 'left'}}>
                <Typography color={"dimgray"} variant={"body2"}>{'Content type: ' +  content.join(", ")}</Typography>
                {(language.length !== 0) ? <Typography color={"dimgray"} variant={"body2"}>{'Language: ' +  language.join(", ")}</Typography> : ""}
            </ListItemSecondaryAction>
        </ListItemButton>
        <List dense={true} sx={{pt: 0}}>
            {props.expression && props.expression.manifestations.slice(0,5).map(m => (<Manifestation manifestation={m} key={m.uri} checkboxes={props.checkboxes}/>))}
        </List>
    </Paper>
}