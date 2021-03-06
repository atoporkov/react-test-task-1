import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import autobind from 'react-autobind';

import APP_CONFIG from '../../config';

import style from './style.scss';
import { error } from 'util';

@CSSModules(style)
class TodoForm extends Component {
  constructor() {
    super();
    autobind(this);
  }

  // handle form submit
  _onFormSubmit(e) {
    e.preventDefault();

    let data = {
        isActive: true,
        priority: 0
    };

    // data collectiong using refs
    Object.keys(this.refs).map(ref => {
        let field = this.refs[ref];
        if(field.type == 'date')
            data[ref] = new Date(field.value).getTime() / 1000;
        else
            data[ref] = field.value;
    });

    this.props.onSubmit(data);
  }

  // handle form cancelation
  _onFormCancel() {
    this.props.onCancel();
  }

  // converting timestamp to user-friendly data
  _getDate(date) {
    let d = new Date(date * 1000);
    return d.getFullYear()+'-'+(d.getMonth() < 9 ? '0'+(d.getMonth()+1) : (d.getMonth()+1))+'-'+(d.getDate() < 9 ? '0'+d.getDate() : d.getDate());
  }

  render() {
    return (
        <div className={style['todo-form-component']}>
            <h4 style={{textAlign: "center"}}>{this.props.formHeader}</h4>
            <form onSubmit={this._onFormSubmit}>
                <fieldset>
                    {/* Title group */}
                    <label htmlFor="titleInput">Title</label>
                    <input type="text" ref="title" id="titleInput" defaultValue={this.props.title} />
                    {/* Description group */}
                    <label htmlFor="descriptionInput">Description</label>
                    <textarea ref="descr" id="descriptionInput" defaultValue={this.props.descr}></textarea>
                    {/* Priority group */}
                    <label htmlFor="priorityInput">Priority</label>
                    <select ref="priority" defaultValue={this.props.priority}>
                        {Object.keys(APP_CONFIG['todo']['priority']).map((key, arr, index) =>
                            <option key={key} value={key}>{APP_CONFIG['todo']['priority'][key]['name']}</option>)}
                    </select>
                    {/* Start date group */}
                    <label htmlFor="startDateInput">Start date</label>
                    <input type="date" ref="startDate" id="startDateInput" defaultValue={this._getDate(this.props.startDate)} />
                    {/* Due date group */}
                    <label htmlFor="dueDateInput">Due date</label>
                    <input type="date" ref="dueDate" id="dueDateInput" defaultValue={this._getDate(this.props.dueDate)} />

                    <input type="submit" value="Save" />
                    <input type="button" style={{marginLeft: "10px"}} className="button-outline" onClick={this._onFormCancel} value="Cancel" />
                </fieldset>
            </form>
        </div>
    );
  }
}

export default TodoForm;
