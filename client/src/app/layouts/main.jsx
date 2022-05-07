import React from "react";

const Main = () => {
    return (
        <div className="container w-100">
            <div className="card" style={{ width: "100%" }}>
                <div className="card-body">
                    <h2 className="card-title text-center">Hi everyone!</h2>
                    <h6 className="card-subtitle mb-2 text-muted">
                        *very interesting subtitle*
                    </h6>
                    <p className="card-text">
                        {`  It is my first serious pet-project. I wish it will be
                        interesting for you. I did not do a lot of functions,
                        than I planed. But I am going to do it in the future.
                        You can track my github account and make sure :)`}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;
