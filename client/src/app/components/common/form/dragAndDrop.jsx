import React, { useState } from "react";

const DragAndDrop = () => {
    const [drag, setDrag] = useState();

    const dragStartHandler = (e) => {
        console.log("dragStartHandler");
        e.preventDefault();
        setDrag(true);
    };
    const dragLeaveHandler = (e) => {
        e.preventDefault();
        console.log("dragLeaveHandler");
        setDrag(false);
    };

    const onDropHandler = (e) => {
        e.preventDefault();
        const image = [...e.dataTransfer.files];
        console.log(image);
    };

    return (
        <div className="drop-area_container mb-4">
            {drag ? (
                <div
                    className="drop-area"
                    onDragStart={(e) => dragStartHandler(e)}
                    onDragLeave={(e) => dragLeaveHandler(e)}
                    onDragOver={(e) => dragStartHandler(e)}
                    onDrop={(e) => onDropHandler(e)}
                >
                    Отпустите файлы, чтобы загрузить их
                </div>
            ) : (
                <div
                    className="drop-area"
                    onDragStart={(e) => dragStartHandler(e)}
                    onDragLeave={(e) => dragLeaveHandler(e)}
                    onDragOver={(e) => dragStartHandler(e)}
                >
                    Перенесите файлы, чтобы загрузить их
                </div>
            )}
        </div>
    );
};

export default DragAndDrop;
