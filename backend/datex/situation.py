from datetime import datetime


def get_attr(tree, attr_name, target=None):
    ns = '{' + 'http://datex2.eu/schema/2/2_0' + '}'
    elem = tree.find(ns + attr_name)
    if target == 'text' and elem is not None:
        elem = elem.text
    if target == 'date' and elem is not None:
        elem = datetime.strptime(elem.text, '%Y-%m-%dT%H:%M:%S%z')
    if target == 'float' and elem is not None:
        elem = float(elem.text)
    if target == 'int' and elem is not None:
        elem = int(elem)
    return elem


class Situation:
    def __init__(self, data=None):
        self.data = data  # XML-tree

    def serialize_general_data(self):
        if self.data == None:
            return {
                "title": "No situation on coordinate. Display title and info stored frontend",
                "startTime": "",
                "endTime": "",
                "info": "",
                "road": "",
                "color": "#c2eabd",
            }
        # unique ID
        title = self.data.attrib['id']

        # start time and end time
        situationRecord = get_attr(self.data, 'situationRecord')
        validity = get_attr(situationRecord, 'validity')
        validityTimeSpecification = get_attr(validity, 'validityTimeSpecification')
        validPeriod = get_attr(validityTimeSpecification, 'validPeriod')
        recurringTimePeriodOfDay = get_attr(validPeriod, 'recurringTimePeriodOfDay')
        startTime = get_attr(recurringTimePeriodOfDay, 'startTimeOfPeriod', target='text')
        endTime = get_attr(recurringTimePeriodOfDay, 'endTimeOfPeriod', target='text')

        # info
        generalPublicComment = get_attr(situationRecord, 'generalPublicComment')
        comment = get_attr(generalPublicComment, 'comment')
        info = get_attr(comment, 'values')[0].text

        # road identification
        groupOfLocations = get_attr(situationRecord, 'groupOfLocations')
        locationExtension = get_attr(groupOfLocations, 'locationExtension')
        locationExtension = get_attr(locationExtension, 'locationExtension')
        road = locationExtension[0].text

        # TODO: fetch color
        # store result in python dict for easy json converting
        res = {'title': title,
               'startTime': startTime,
               'endTime': endTime,
               'info': info,
               'road': road}

        return res
