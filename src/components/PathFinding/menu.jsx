

import { Component } from 'react';

class Menu extends Component {
    render() {
        return (
            <div className="w-64 bg-zinc-800 p-4 space-y-6">
            <div className='w-full flex justify-center'>
            <h2 className="text-2xl  font-semibold text-white ">Settings</h2>
            </div>
            <div className='flex flex-col gap-5 items-center  h-full'>
                
                <button className="rounded mt-32 text-white border border-yellow-500 w-32 text-center hover:bg-yellow-500" onClick={this.props.onClearPath}>Clear Path</button>
                <button className="rounded text-white border border-yellow-500 hover:bg-yellow-500 w-32 text-center" onClick={this.props.onClearBoard}>Clear Board</button>
                <button className="rounded text-white border border-yellow-500 hover:bg-yellow-500 w-32 text-center" onClick={this.props.onCreateMaze}>Create Maze</button>
                <button className="rounded text-white border border-yellow-500 hover:bg-yellow-500 w-32 text-center" onClick={this.props.onVisualize}>Visualize</button>
            </div>
           
            
            </div>
        );
    }
}

export default Menu;