import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import useImmerProduce from '.';

const TestComponent = ({ testFn }) => {
    const [testObj, updateTestObj] = useImmerProduce({
        value: 14
    });

    const onClick = () => {
        const draft = updateTestObj((draft) => {
            draft.value = 75;
        });
        testFn(draft.value);
    };

    return (
        <div>
            <p data-testid="TestObj-Value">{testObj.value}</p>
            <button onClick={onClick} data-testid="TestButton">
                Test Button
            </button>
        </div>
    );
};

it('Should return 75 as the draft value, not 14', () => {
    const testFn = jest.fn();
    const { getByTestId } = render(<TestComponent testFn={testFn} />);

    expect(getByTestId('TestObj-Value')).toContainHTML('14');

    fireEvent.click(getByTestId('TestButton'));

    // immediate check - no re-render
    expect(testFn).toHaveBeenLastCalledWith(75);

    // re-rendered
    expect(getByTestId('TestObj-Value')).toContainHTML('75');
});
