import shutil, os

base = r'c:\Users\acer\Desktop\portfolio\intelliguide pictures'

copies = [
    ('8808a0a9-2ba1-4f42-9346-3e1c2f08b987.jpg',        'ig-camera-detection.jpg'),
    ('b0501d30-84a4-4ec6-8ac3-797f8b93f837.jpg',         'ig-map.jpg'),
    ('65bdd917-b22e-4059-912c-bad6a4283a64.jpg',         'ig-save-location.jpg'),
    ('0809ef86-453b-4602-8269-5a1d566574ff.jpg',         'ig-settings.jpg'),
    ('0c21153e-c4d6-47e3-b590-eb2934ca1097 (1).jpg',     'ig-location-history.jpg'),
]

for src, dst in copies:
    s = os.path.join(base, src)
    d = os.path.join(base, dst)
    shutil.copy2(s, d)
    print('Copied:', dst)

print('All done.')
