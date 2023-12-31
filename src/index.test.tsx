/* eslint-disable sonarjs/no-duplicate-string */
import { render, fireEvent, screen } from "@testing-library/react";
import React, { ReactElement } from "react";
import "@testing-library/jest-dom";
import useImmerProduce from ".";

const TestComponent = ({
    testFn,
    initialValue,
}: {
    initialValue: { value: number } | (() => { value: number });
    testFn: (value: number) => void;
}): ReactElement => {
    const [testObj, updateTestObj] = useImmerProduce(initialValue);

    const onClick = (): void => {
        const draft = updateTestObj((innerDraft) => {
            innerDraft.value = 75;
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

it("Should return 75 as the draft value, not 14", () => {
    const testFn = jest.fn();
    render(
        <TestComponent
            testFn={testFn}
            initialValue={{
                value: 14,
            }}
        />,
    );

    expect(screen.getByTestId("TestObj-Value")).toContainHTML("14");

    fireEvent.click(screen.getByTestId("TestButton"));

    // immediate check - no re-render
    expect(testFn).toHaveBeenLastCalledWith(75);

    // re-rendered
    expect(screen.getByTestId("TestObj-Value")).toContainHTML("75");
});

it("Should accept a function as initializer (and still have the next functionality work)", () => {
    const testFn = jest.fn();
    render(
        <TestComponent
            testFn={testFn}
            initialValue={() => ({
                value: 14,
            })}
        />,
    );

    expect(screen.getByTestId("TestObj-Value")).toContainHTML("14");

    fireEvent.click(screen.getByTestId("TestButton"));

    // immediate check - no re-render
    expect(testFn).toHaveBeenLastCalledWith(75);

    // re-rendered
    expect(screen.getByTestId("TestObj-Value")).toContainHTML("75");
});
