import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const FollowModal = ({ modalInfo, toggleModal }) => {
    return (
        <div
            className={`modal fade ${modalInfo.type ? "show" : ""}`}
            id="exampleModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            style={
                modalInfo.type ? { paddingRight: "17px", display: "block" } : {}
            }
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            {modalInfo.type
                                ? modalInfo.type[0].toUpperCase() +
                                  modalInfo.type.slice(1)
                                : ""}
                        </h5>
                        <button
                            type="button"
                            className="btn close"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={() => toggleModal(null)}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {!modalInfo.isLoading && modalInfo.type
                            ? modalInfo.entities.map((s) => (
                                  //   <p key={s}>{s.name}</p>
                                  <Link
                                      onClick={() => toggleModal(null)}
                                      key={s._id}
                                      to={`/blog/${s._id}`}
                                      className="text-decoration-none"
                                  >
                                      <p className="display-6">
                                          {s.name} {s.surname}
                                      </p>
                                  </Link>
                              ))
                            : "Loading..."}
                    </div>
                </div>
            </div>
        </div>
    );
};

FollowModal.propTypes = {
    modalInfo: PropTypes.object.isRequired,
    toggleModal: PropTypes.func.isRequired
};

export default FollowModal;
