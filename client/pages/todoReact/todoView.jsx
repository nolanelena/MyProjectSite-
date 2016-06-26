
import $ from 'jQuery';
import React, { PropTypes } from 'react';
import dispatcher from 'pages/todoReact/todoDispatcher';

var TodoItem = React.createClass({
propTypes: {
    data: PropTypes.shape({
      id: PropTypes.number, 
      title: PropTypes.string,
      completed: PropTypes.bool
  }),
    controller: PropTypes.object
  },
  render: function(){
      var todo = this.props.data;

      var title = <div className="col-md-10" onClick={this.titleClick}>{todo.title}</div>;
      if (todo.isEditing){
        title = (
          <div className="col-md-10 title-edit">
          <input type="text" className="form-control" defaultValue= {todo.title} onChange={function(){}} onKeyPress={this.editKeypress}></input>
        </div>

        );
      }

      return (
        <div>
        <div className="col-md-1">
          <input type="checkbox" checked={todo.completed} onChange={this.handleComplete}></input>
        </div>
       {title}
        <div className="col-md-1">
          <button type="button" aria-label="Close" onClick={this.handleClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
      );
    },
    handleComplete: function(){
      var id = this.props.data.id;
      dispatcher.clickComplete(id);
      // TODO this.props.controller.model.itemCompleted(id, newValue);
    },
    handleClose: function(){
      var id = this.props.data.id;
      dispatcher.removeTodo(id);
      // TODO this.props.controller.model.removeItem(id);
    },
    titleClick: function(){
      var id = this.props.data.id;
      dispatcher.startEditMode(id);
      // TODO this.props.controller.model.startEditing(id);
    },
    editKeypress: function(event){
      var id = this.props.data.id;
      var newTitle = $('li').eq(id).find('input[type="text"]').val();
      dispatcher.editTodoTitle(id, newTitle, event);

      // TODO this.props.controller.model.editTitle(newTitle, id);
    }
});
  

module.exports = TodoItem;

