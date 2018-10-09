import React, { Component } from 'react'
//import ReactDOM from 'react-dom'
import Note from './Note'

class Board extends Component {
  constructor(props) {
      super(props)


      this.state = {
          notes: [],

      propTypes:{
          count: function(props, propName) {
              if(typeof props[propName] !== "number") {
                  return new Error("the count must be a number")
              }

              if(props[propName] > 100) {
                  return new Error('Creating ' + props[propName] + ' notes is ridiculous')
              }


              if (this.props.count) {
                  let url = `http://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`
                  fetch(url)
                        .then(results => results.json())
                        .then(array => array[0])
                        .then(text => text.split('. '))
                        .then(array => array.forEach(
                              sentence => this.add(sentence)))
                        .catch(function(err) {
                          console.log("Didn't connect to the API", err)
                        })
              }
          }
      },

    }; //close this.state

   this.nextId = this.nextId.bind(this)
   this.add = this.add.bind(this)
   this.update = this.update.bind(this)
   this.remove = this.remove.bind(this)
   this.eachNote = this.eachNote.bind(this)


  } //close constructor()

    nextId() {
        this.uniqueId = this.uniqueId || 0
        return this.uniqueId++
    }//,
    add(text) {
        let notes = [
            ...this.state.notes,
            {
                id: this.nextId(),
                note: text
            }
        ]
        this.setState({notes})
    }//,
    update(newText, id) {
        let notes = this.state.notes.map(
            note => (note.id !== id) ?
               note :
                {
                    ...note,
                    note: newText
                }
            )
        this.setState({notes})
    }//,
    remove(id) {
        let notes = this.state.notes.filter(note => note.id !== id)
        this.setState({notes})
    }//,
    eachNote(note) {
        return (<Note key={note.id}
                      id={note.id}
                      onChange={this.update}
                      onRemove={this.remove}>
                  {note.note}
                </Note>)
    }//,
    render() {
        return (<div className='board'>
                   {this.state.notes.map(this.eachNote)}
                   <button onClick={() => this.add('New Note')}>+</button>
                </div>)
    }
}
//)

export default Board
