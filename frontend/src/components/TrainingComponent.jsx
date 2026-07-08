import { useState, useEffect } from 'react';

import {
    createTraining,
    getTraining,
    updateTraining
} from '../services/TrainingService';

import {
    useNavigate,
    useParams
} from 'react-router-dom';

const TrainingComponent = () => {

    const navigator = useNavigate();

    const { id } = useParams();

    const [trainingType, setTrainingType] = useState('');
    const [duration, setDuration] = useState('');
    const [trainingDate, setTrainingDate] = useState('');
    const [coachName, setCoachName] = useState('');
    const [errors, setErrors] = useState({

        trainingType: '',

        duration: '',

        trainingDate: '',

        coachName: ''
    });

    useEffect(() => {

        if (id) {

            getTraining(id)

                .then((response) => {

                    setTrainingType(
                        response.data.trainingType
                    );

                    setDuration(
                        response.data.duration
                    );

                    setTrainingDate(
                        response.data.trainingDate
                    );

                    setCoachName(
                        response.data.coachName
                    );

                })

                .catch(error => {

                    console.log(error);
                });
        }

    }, [id]);

    function saveOrUpdateTraining(e) {

        e.preventDefault();

        if (validateForm()) {

            const training = {

                trainingType,

                duration,

                trainingDate,

                coachName
            };

            console.log(training);

            if (id) {

                updateTraining(id, training)

                    .then((response) => {

                        console.log(response.data);

                        navigator('/trainings');

                    })

                    .catch(error => {

                        console.log(error);
                    });

            } else {

                createTraining(training)

                    .then((response) => {

                        console.log(response.data);

                        navigator('/trainings');

                    })

                    .catch(error => {

                        console.log(error);
                    });
            }
        }
    }

    function validateForm() {

        let valid = true;

        const errorsCopy = { ...errors };

        if (!trainingType.trim()) {

            errorsCopy.trainingType =
                'Training Type is required';

            valid = false;

        } else {

            errorsCopy.trainingType = '';
        }

        if (!duration.trim()) {

            errorsCopy.duration =
                'Duration is required';

            valid = false;

        } else {

            errorsCopy.duration = '';
        }

        if (!trainingDate.trim()) {

            errorsCopy.trainingDate =
                'Training Date is required';

            valid = false;

        } else {

            errorsCopy.trainingDate = '';
        }

        if (!coachName.trim()) {

            errorsCopy.coachName =
                'Coach Name is required';

            valid = false;

        } else {

            errorsCopy.coachName = '';
        }

        setErrors(errorsCopy);

        return valid;
    }

    function pageTitle() {

        if (id) {

            return (
                <h2 className="text-center">
                    Update Training
                </h2>
            );

        } else {

            return (
                <h2 className="text-center">
                    Add Training
                </h2>
            );
        }
    }

    return (

        <div className="container">

            <br />

            <div className="row">

                <div className="card col-md-6 offset-md-3">

                    {pageTitle()}

                    <div className='card-body'>

                        <form>

                            {/* Training Type */}

                            <div className="form-group">

                                <label className="form-label">
                                    Training Type
                                </label>

                                <input
                                    type="text"

                                    placeholder="Enter Training Type"

                                    className={`form-control ${
                                        errors.trainingType
                                            ? 'is-invalid'
                                            : ''
                                    }`}

                                    value={trainingType}

                                    onChange={(e) =>
                                        setTrainingType(
                                            e.target.value
                                        )
                                    }
                                />

                                {
                                    errors.trainingType &&

                                    <div className="invalid-feedback">

                                        {errors.trainingType}

                                    </div>
                                }

                            </div>

                           <div className="form-group mt-3">

                                <label className="form-label">
                                    Coach Name
                                </label>

                                <input
                                    type="text"

                                    placeholder="Enter Coach Name"

                                    className={`form-control ${
                                        errors.coachName
                                            ? 'is-invalid'
                                            : ''
                                    }`}

                                    value={coachName}

                                    onChange={(e) =>
                                        setCoachName(
                                            e.target.value
                                        )
                                    }
                                />

                                {
                                    errors.coachName &&

                                    <div className="invalid-feedback">

                                        {errors.coachName}

                                    </div>
                                }

                            </div> 

                            {/* Duration */}

                            <div className="form-group mt-3">

                                <label className="form-label">
                                    Duration
                                </label>

                                <input
                                    type="text"

                                    placeholder="Enter Duration"

                                    className={`form-control ${
                                        errors.duration
                                            ? 'is-invalid'
                                            : ''
                                    }`}

                                    value={duration}

                                    onChange={(e) =>
                                        setDuration(
                                            e.target.value
                                        )
                                    }
                                />

                                {
                                    errors.duration &&

                                    <div className="invalid-feedback">

                                        {errors.duration}

                                    </div>
                                }

                            </div>

                            {/* Training Date */}

                            <div className="form-group mt-3">

                                <label className="form-label">
                                    Training Date
                                </label>

                                <input
                                    type="date"

                                    className={`form-control ${
                                        errors.trainingDate
                                            ? 'is-invalid'
                                            : ''
                                    }`}

                                    value={trainingDate}

                                    onChange={(e) =>
                                        setTrainingDate(
                                            e.target.value
                                        )
                                    }
                                />

                                {
                                    errors.trainingDate &&

                                    <div className="invalid-feedback">

                                        {errors.trainingDate}

                                    </div>
                                }

                            </div>

                            <button
                                className="btn btn-success mt-3"

                                onClick={saveOrUpdateTraining}
                            >
                                Submit
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default TrainingComponent;