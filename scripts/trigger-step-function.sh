#!/bin/bash

STEP_FUNCTION_NAME="DataProcessingStateMachine"
INPUT_PAYLOAD='{"key": "value"}'

STEP_FUNCTION_ARN=$(aws stepfunctions list-state-machines --query "stateMachines[?contains(name, '$STEP_FUNCTION_NAME')].stateMachineArn" --output text)

if [[ -z "$STEP_FUNCTION_ARN" ]]; then
    echo "Step function with name $STEP_FUNCTION_NAME not found"
    exit 1
fi

echo "Found step function ARN: $STEP_FUNCTION_ARN"

echo "Starting execution of Step Function..."
EXECUTION_RESULT=$(aws stepfunctions start-execution --state-machine-arn "$STEP_FUNCTION_ARN" --input "$INPUT_PAYLOAD")

# Check if execution was successful
if [[ $? -ne 0 ]]; then
    echo "Error: Failed to start execution."
    exit 1
fi

# Output result
echo "Execution started successfully:"
echo "$EXECUTION_RESULT"