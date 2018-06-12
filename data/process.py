import math
import pandas
import sys


def date2days(d):
    if isinstance(d, float) and math.isnan(d):
        return d

    neg = d[0] == '-'
    if neg:
        d = d[1:]

    (year, month, day) = map(float, d.split('-'))

    return (-1 if neg else 1) * (year * 365 + month * (365. / 12) + day)

def main():
    df = pandas.read_csv(sys.stdin)

    for f in ['birth', 'death', 'reign.start', 'reign.end']:
        newF = '%s.days' % (f)

        df[newF] = df[f].map(date2days)

    names = df.apply(lambda x: x['name'], axis=1)

    print df.to_json(orient='index')

    return 0

if __name__ == '__main__':
    sys.exit(main())
