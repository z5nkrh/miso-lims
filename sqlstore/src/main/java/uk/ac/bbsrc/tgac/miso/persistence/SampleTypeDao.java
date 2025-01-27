package uk.ac.bbsrc.tgac.miso.persistence;

import java.io.IOException;
import java.util.Collection;
import java.util.List;

import uk.ac.bbsrc.tgac.miso.core.data.SampleType;

public interface SampleTypeDao extends SaveDao<SampleType> {

  SampleType getByName(String name) throws IOException;
  
  long getUsage(SampleType sampleType) throws IOException;

  List<SampleType> listByIdList(Collection<Long> ids) throws IOException;

}
