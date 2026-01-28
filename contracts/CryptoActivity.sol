function recordActivity(string memory activity) public {
    require(bytes(activity).length > 0, "Activity cannot be empty");
    activities[msg.sender].push(activity);
}

