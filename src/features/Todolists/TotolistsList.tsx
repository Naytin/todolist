import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../Components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/TodoList";
import {Redirect} from "react-router-dom";
import {selectIsLoggedIn} from "../Auth/selectors";
import {selectorTodolists} from "./selectors";
import {selectorTasks} from "./Todolist/Task/selector";
import {useActions} from "../../hooks/useActions";


export const TodolistsList: React.FC = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const todolists = useSelector(selectorTodolists)
    const tasks = useSelector(selectorTasks);

    const {fetchTodolistsTC, addTodolistsTC} = useActions()

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        fetchTodolistsTC()
    }, [])

    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }
    return <>
        <Grid container style={{padding: '20px'}} justify="center" alignItems="center"
              direction="column">
            <div style={{marginRight: '20px'}}>Add new task</div>
            <AddItemForm addItem={addTodolistsTC}/>
        </Grid>
        <Grid container spacing={3} justify='space-around'>
            {todolists.map(t => {
                let allTodoLists = tasks[t.id];
                return (
                    <Grid key={t.id} item style={{padding: '20px'}}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist key={t.id}
                                      todolist={t}
                                      title={t.title}
                                      tasks={allTodoLists}
                                      filter={t.filter}
                                      todolistId={t.id}
                            />
                        </Paper>
                    </Grid>
                )
            })}
        </Grid>
    </>
}