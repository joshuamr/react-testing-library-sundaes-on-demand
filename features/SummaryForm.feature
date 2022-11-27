Feature: Summary Page

    Scenario: Confirming the summary
        Given there is a checkbox to confirm the condition on the page
        And there is a button to place the order on the page
        And the checkbox is unchecked
        And the button is disabled
        When the checkbox is checked
        Then the button is enabled
        When the checkbox is checked again
        Then the button is disabled again

    Scenario: Hovering the terms and condition
        Given there is text on the page that says terms and condition
        Given the popover is not in the dom
        When the text is hovered
        Then the popover is shown
        When the text is unhovered
        Then the popover is hidden again